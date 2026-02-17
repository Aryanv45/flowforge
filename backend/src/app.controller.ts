import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth-guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('me')

  getProfile(@Req() req: any){
    return req.user;
  }
}
