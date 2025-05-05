import { Link } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const threshold = Math.min(window.innerHeight * 0.2, 200);
      setScrolled(scrollY > threshold);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className='container min-w-full flex justify-between items-center p-4'>
        <Link className='text-white text-4xl drop-shadow-2l font-bold' to='/'>
          The Adventurer's Guild
        </Link>
        <div className='flex text-white space-x-4 drop-shadow-md text-2xl'>
          <NavTab to='/join-us'>Join Us</NavTab>
          <NavTab to='/gallery'>Gallery</NavTab>
          <NavTab to='/about'>About Us</NavTab>
        </div>
      </div>
    </nav>
  );
}

function NavTab({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{
        className: 'font-bold',
      }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}
