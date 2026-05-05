import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { useAuth } from '@/features/auth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, handleLogin, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin({ email, password });
      navigate('/');
    } catch (err) {}
  };

  if (loading) return <main>Loading...</main>;

  if (user) return <Navigate to={'/'} />;

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to={'/register'}>Register</Link>
      </p>
    </main>
  );
}
