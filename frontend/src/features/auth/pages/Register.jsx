import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { useAuth } from '@/features/auth';

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const { loading, handleRegister, user } = useAuth();
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleRegister({ username, email, password });
      navigate('/');
    } catch (err) {}
  };

  if (loading) return <main>Loading...</main>;

  if (user) return <Navigate to={'/'} />;

  return (
    <main className="grow flex items-center justify-center px-margin_mobile py-stack_lg">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-margin_mobile">
        {/* Heading & Subtext */}
        <div className="mb-stack_lg text-center">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-stack_sm">
            Create your account
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Join TalentPulse AI to streamline your Job hunt
          </p>
        </div>
        {/* Social Sign Up */}
        <div className="space-y-stack_md">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-outline-variant rounded-lg bg-surface hover:bg-surface-container transition-colors duration-200">
            <i className="fa-brands fa-google size-4.5"></i>
            <span className="font-label-md text-label-md text-on-surface">
              Sign up with Google
            </span>
          </button>
        </div>
        {/* Divider */}
        <div className="flex items-center gap-stack_md my-stack_lg">
          <div className="grow h-px bg-outline-variant"></div>
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
            OR
          </span>
          <div className="grow h-px bg-outline-variant"></div>
        </div>
        {/* Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-stack_md">
          {/* Username */}
          <div>
            <label
              className="block font-label-md text-label-md text-on-surface-variant mb-1"
              htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-body-md placeholder:text-outline"
              id="username"
              placeholder="Enter username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Email */}
          <div>
            <label
              className="block font-label-md text-label-md text-on-surface-variant mb-1"
              htmlFor="email">
              Email ID
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-body-md placeholder:text-outline"
              id="email"
              placeholder="name@company.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div>
            <label
              className="block font-label-md text-label-md text-on-surface-variant mb-1"
              htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-body-md placeholder:text-outline"
                id="password"
                placeholder="Min. 8 characters"
                type={passwordVisibility ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute grid place-items-center rounded-full right-3 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer p-1 hover:bg-surface-dim"
                type="button"
                onClick={toggleVisibility}>
                <span
                  className="material-symbols-outlined text-[20px]"
                  data-icon="visibility">
                  visibility
                </span>
              </button>
            </div>
          </div>
          {/* Primary Action */}
          <button
            className="w-full rounded-lg bg-primary text-on-primary py-3 flex items-center justify-center gap-stack_sm font-headline-sm text-headline-sm active:opacity-80 transition-all hover:bg-primary-container mt-stack_lg"
            type="submit">
            Create Account
            <span
              className="material-symbols-outlined text-[18px]"
              data-icon="arrow_forward">
              arrow_forward
            </span>
          </button>
        </form>
        {/* Terms & Privacy */}
        {/* <div className="mt-stack_lg text-center">
          <p className="font-label-md text-label-md text-on-surface-variant leading-relaxed">
            By clicking "Create Account", you agree to our <br />
            <a
              className="text-primary hover:underline"
              href="#">
              Terms of Service
            </a>
            and
            <a
              className="text-primary hover:underline"
              href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div> */}
        {/* Login Link */}
        <div className="mt-stack_lg pt-stack_lg border-t border-outline-variant text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Already have an account?
            <Link
              className="text-primary font-bold hover:underline ml-1"
              to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
