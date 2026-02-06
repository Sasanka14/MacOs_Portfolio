import React, { useState, useRef, useEffect } from 'react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      {/* User Icon Button */}
      <button
        ref={iconRef}
        onClick={() => setIsOpen(!isOpen)}
        className="icon-hover p-1 rounded-md transition-colors hover:bg-white/10"
        aria-label="User menu"
        type="button"
      >
        <img src="/icons/user.svg" alt="user" />
      </button>

      {/* User Profile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full mt-2 w-40 backdrop-blur-md rounded-lg shadow-2xl z-50 overflow-hidden"
          style={{
            backgroundColor: document.documentElement.classList.contains('dark') 
              ? 'rgba(30, 30, 30, 0.85)' 
              : 'rgba(245, 245, 247, 0.95)',
            border: document.documentElement.classList.contains('dark')
              ? '1px solid rgba(255, 255, 255, 0.15)'
              : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: document.documentElement.classList.contains('dark')
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
              : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            right: '-8px',
          }}
        >
          <div className="py-3 px-4 flex flex-col gap-1">
            {/* Admin | Zoro - Regular text */}
            <div className="text-xs font-medium">
              <span className={document.documentElement.classList.contains('dark') ? 'text-orange-400' : 'text-orange-600'}>Admin</span> 
              <span className={document.documentElement.classList.contains('dark') ? 'text-white/60' : 'text-gray-400'}> | </span> 
              <span className={document.documentElement.classList.contains('dark') ? 'text-orange-300' : 'text-orange-600'}>Zoro</span>
            </div>
            
            {/* Sasanka - Cursive style */}
            <div 
              className={document.documentElement.classList.contains('dark') ? 'text-white/90' : 'text-gray-800'}
              style={{ fontFamily: 'cursive', letterSpacing: '0.5px', fontSize: '1.125rem' }}
            >
              Sasanka
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
