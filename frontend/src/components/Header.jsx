import React from 'react';
import { Link, useLocation } from 'react-router';

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="bg-surface border-b border-outline-variant docked full-width top-0 z-50">
      <div className="flex justify-between items-center w-full px-margin_mobile py-4 max-w-7xl mx-auto">
        <div className="font-headline-md text-headline-md font-bold text-primary">
          Gen2Res AI
        </div>
        {/* Navigation Links suppressed for Mobile in shell according to platform pivot, using simple secondary action */}
        <div className="flex gap-4">
          <Link
            to={pathname === '/login' ? '/register' : '/login'}
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200">
            {pathname === '/login' ? 'Register' : 'Login'}
          </Link>
        </div>
      </div>
    </header>
  );
}
