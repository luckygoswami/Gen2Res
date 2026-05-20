import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-stack_lg px-margin_mobile bg-surface-container-low border-t border-outline-variant flex flex-col items-center gap-gutter">
      <div className="font-headline-sm text-headline-sm font-bold text-primary">
        Gen2Res AI
      </div>
      <div className="font-body-md text-body-md text-on-surface">
        © {new Date().getFullYear()} Gen2Res AI. All rights reserved.
      </div>
    </footer>
  );
}
