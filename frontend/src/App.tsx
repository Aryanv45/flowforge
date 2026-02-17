import { useState } from 'react';
import { login, getMe } from './api';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<any>(null);

  const handleLogin = async () => {
    const res = await login(email, password);
    setToken(res.access_token);
  };

  const fetchMe = async () => {
    if (!token) return;
    const data = await getMe(token);
    setMe(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>FlowForge</h1>

      {!token ? (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <p>Logged in</p>
          <button onClick={fetchMe}>Fetch /me</button>
          <pre>{JSON.stringify(me, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;
