import { Injectable,  UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(email, hashed, name);
    return { id: user.id, email: user.email, name: user.name};
    }

    async login(email: string, password: string) {
      const user = await this.usersService.findByEmail(email);
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new UnauthorizedException('Invalid credentials');

      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);
      
      return { access_token: token };
    }
}   