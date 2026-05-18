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
    <main className="grow flex items-center justify-center px-margin_mobile py-stack_lg">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-margin_mobile">
        {/* Welcome Heading */}
        <div className="mb-stack_lg text-center">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
            Welcome back
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Please enter your details to sign in to your recruitment workspace.
          </p>
        </div>
        {/* Social Login */}
        <div className="space-y-stack_md">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-outline-variant rounded-lg bg-surface hover:bg-surface-container transition-colors duration-200">
            <i class="fa-brands fa-google size-4.5"></i>
            <span className="font-label-md text-label-md text-on-surface">
              Continue with Google
            </span>
          </button>
        </div>
        {/* Divider */}
        <div className="flex items-center my-stack_lg">
          <div className="grow border-t border-outline-variant"></div>
          <span className="px-4 font-label-md text-label-md text-outline uppercase tracking-widest">
            OR
          </span>
          <div className="grow border-t border-outline-variant"></div>
        </div>
        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-stack_md">
          {/* Email Input */}
          <div className="space-y-2">
            <label
              className="block font-label-md text-label-md text-on-surface"
              htmlFor="email">
              Email ID
            </label>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
                data-icon="mail">
                mail
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-body-md text-body-md"
                id="email"
                placeholder="mail@address.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                className="block font-label-md text-label-md text-on-surface"
                htmlFor="password">
                Password
              </label>
              <a
                className="font-label-md text-label-md text-primary hover:underline"
                href="#">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
                data-icon="lock">
                lock
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-body-md text-body-md"
                id="password"
                placeholder="••••••••"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* Primary Action */}
          <button
            className="w-full py-3 bg-primary text-on-primary rounded-lg font-headline-sm text-headline-sm shadow-md hover:bg-primary-container transition-all active:opacity-80"
            type="submit">
            Log In
          </button>
        </form>
        {/* Footer Sign Up Link */}
        <div className="mt-stack_lg text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Don't have an account?&nbsp;
            <Link
              className="text-primary font-bold hover:underline"
              to={'/register'}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
