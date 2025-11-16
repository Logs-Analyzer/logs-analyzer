import React from 'react';

interface CyberBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const CyberBackground: React.FC<CyberBackgroundProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative min-h-screen bg-background ${className}`}>
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg
          className="absolute inset-0 h-full w-full text-cyan-400"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circuit Board Pattern */}
          <defs>
            <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              {/* Horizontal lines */}
              <line x1="0" y1="20" x2="120" y2="20" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="0" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="0" y1="100" x2="120" y2="100" stroke="currentColor" strokeWidth="0.5"/>
              
              {/* Vertical lines */}
              <line x1="20" y1="0" x2="20" y2="120" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="60" y1="0" x2="60" y2="120" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="100" y1="0" x2="100" y2="120" stroke="currentColor" strokeWidth="0.5"/>
              
              {/* Connection nodes */}
              <circle cx="20" cy="20" r="2" fill="currentColor"/>
              <circle cx="60" cy="20" r="2" fill="currentColor"/>
              <circle cx="100" cy="20" r="2" fill="currentColor"/>
              <circle cx="20" cy="60" r="2" fill="currentColor"/>
              <circle cx="60" cy="60" r="2" fill="currentColor"/>
              <circle cx="100" cy="60" r="2" fill="currentColor"/>
              <circle cx="20" cy="100" r="2" fill="currentColor"/>
              <circle cx="60" cy="100" r="2" fill="currentColor"/>
              <circle cx="100" cy="100" r="2" fill="currentColor"/>
              
              {/* Small rectangles (resistors/components) */}
              <rect x="35" y="18" width="8" height="4" fill="currentColor"/>
              <rect x="75" y="18" width="8" height="4" fill="currentColor"/>
              <rect x="18" y="35" width="4" height="8" fill="currentColor"/>
              <rect x="58" y="35" width="4" height="8" fill="currentColor"/>
              <rect x="98" y="35" width="4" height="8" fill="currentColor"/>
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Floating Security Icons */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        {/* Lock Icons - More locks scattered around */}
        <svg className="absolute top-20 left-20 h-12 w-12 text-cyan-300 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3M12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13Z" />
        </svg>
        
        <svg className="absolute top-40 right-32 h-10 w-10 text-blue-300 animate-float-delay-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
        </svg>

        {/* Additional Lock Icons */}
        <svg className="absolute top-32 right-1/4 h-8 w-8 text-cyan-400 animate-float-delay-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3M12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13Z" />
        </svg>

        <svg className="absolute bottom-20 left-1/3 h-9 w-9 text-blue-400 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3M12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13Z" />
        </svg>

        <svg className="absolute top-1/2 left-20 h-7 w-7 text-cyan-300 animate-float-delay-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
        </svg>

        <svg className="absolute bottom-1/3 right-40 h-11 w-11 text-blue-300 animate-float-delay-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3M12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13Z" />
        </svg>

        <svg className="absolute top-3/4 left-1/2 h-6 w-6 text-cyan-400 animate-float-delay-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
        </svg>

        <svg className="absolute top-16 left-1/2 h-8 w-8 text-blue-400 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3M12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13Z" />
        </svg>

        <svg className="absolute bottom-16 right-1/3 h-10 w-10 text-cyan-300 animate-float-delay-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
        </svg>

        {/* Shield Icons with Lock */}
        <svg className="absolute bottom-40 left-40 h-8 w-8 text-green-300 animate-float-delay-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15.5C16.4,11 17,11.4 17,12V18C17,18.6 16.6,19 16,19H8C7.4,19 7,18.6 7,18V12C7,11.4 7.4,11 8,11H8.5V10C8.5,8.6 9.6,7 12,7M12,8.2C10.2,8.2 9.8,9.2 9.8,10V11H14.2V10C14.2,9.2 13.8,8.2 12,8.2Z" />
        </svg>

        {/* Regular Shield Icons */}
        <svg className="absolute top-60 left-1/3 h-14 w-14 text-cyan-400 animate-float-delay-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15.5C16.4,11 17,11.4 17,12V18C17,18.6 16.6,19 16,19H8C7.4,19 7,18.6 7,18V12C7,11.4 7.4,11 8,11H8.5V10C8.5,8.6 9.6,7 12,7M12,8.2C10.2,8.2 9.8,9.2 9.8,10V11H14.2V10C14.2,9.2 13.8,8.2 12,8.2Z" />
        </svg>

        <svg className="absolute bottom-32 right-20 h-11 w-11 text-blue-300 animate-float-delay-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9" />
        </svg>

        {/* Additional Security Icons */}
        <svg className="absolute top-1/4 left-10 h-9 w-9 text-green-400 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9" />
        </svg>

        {/* Network/Connection Icons */}
        <svg className="absolute top-1/3 right-1/4 h-9 w-9 text-green-400 animate-float-delay-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,3A2,2 0 0,1 19,5V15A2,2 0 0,1 17,17H13V19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H7L5,15V5A2,2 0 0,1 7,3H17M7,5V15H17V5H7Z" />
        </svg>

        <svg className="absolute bottom-1/4 left-1/4 h-10 w-10 text-cyan-300 animate-float-delay-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H16L12,22L8,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,4V16H8.83L12,19.17L15.17,16H20V4H4Z" />
        </svg>

        {/* Key Icons for variety */}
        <svg className="absolute top-1/4 right-10 h-8 w-8 text-yellow-400 animate-float-delay-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7,14A3,3 0 0,1 10,17A3,3 0 0,1 7,20A3,3 0 0,1 4,17A3,3 0 0,1 7,14M7.31,16L8.72,14.59L15.14,21L13.72,22.41L7.31,16M18.42,7.22C19.2,8 19.2,9.27 18.42,10.05L16.59,11.88L12.12,7.41L13.95,5.58C14.73,4.8 16,4.8 16.78,5.58L18.42,7.22Z" />
        </svg>

        <svg className="absolute bottom-1/2 left-3/4 h-7 w-7 text-yellow-300 animate-float-delay-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7,14A3,3 0 0,1 10,17A3,3 0 0,1 7,20A3,3 0 0,1 4,17A3,3 0 0,1 7,14M7.31,16L8.72,14.59L15.14,21L13.72,22.41L7.31,16M18.42,7.22C19.2,8 19.2,9.27 18.42,10.05L16.59,11.88L12.12,7.41L13.95,5.58C14.73,4.8 16,4.8 16.78,5.58L18.42,7.22Z" />
        </svg>
      </div>

      {/* Subtle dark overlay for better card contrast */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default CyberBackground;
