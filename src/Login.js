import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-page" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />

        <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
      <button type="submit" style={{ padding: '10px', borderRadius: '4px', background: '#19bd78', color: '#fff', border: 'none', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
