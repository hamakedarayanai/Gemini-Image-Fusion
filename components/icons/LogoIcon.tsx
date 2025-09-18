import React from 'react';

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" /> {/* cyan-400 */}
        <stop offset="100%" stopColor="#c084fc" /> {/* purple-400 */}
      </linearGradient>
    </defs>
    <path
      d="M10.5 4.5L5 8.5V15.5L10.5 19.5L16 15.5V8.5L10.5 4.5Z"
      stroke="url(#logoGradient)"
      strokeWidth="1.5"
    />
    <path
      d="M13.5 4.5L19 8.5V15.5L13.5 19.5L8 15.5V8.5L13.5 4.5Z"
      stroke="url(#logoGradient)"
      strokeWidth="1.5"
    />
  </svg>
);

export default LogoIcon;
