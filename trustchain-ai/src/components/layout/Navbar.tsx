import { Bell, HelpCircle, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Verify Product', href: '/verify' },
    { name: 'Verify Vendor', href: '/verify' }, // Simplification for demo
    { name: 'History', href: '#' },
  ];

  return (
    <nav className="bg-surface/70 backdrop-blur-xl border-b border-on-surface/10 sticky top-0 z-50 flex justify-between items-center w-full px-4 md:px-12 py-4">
      <div className="flex items-center gap-8 md:gap-12">
        <Link to="/" className="font-bold text-xl md:text-2xl text-on-surface tracking-tight outline-none">
          TrustChain AI
        </Link>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-secondary",
                location.pathname === link.href ? "text-secondary border-b-2 border-secondary pb-1" : "text-on-surface-variant"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:text-secondary transition-colors transition-transform active:scale-95">
          <Bell size={20} />
        </button>
        <button className="p-2 text-on-surface-variant hover:text-secondary transition-colors transition-transform active:scale-95">
          <HelpCircle size={20} />
        </button>
        <Link to="/verify" className="hidden sm:block outline-none">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-secondary text-on-secondary px-6 py-2 rounded-lg text-sm font-semibold transition-shadow hover:shadow-lg hover:shadow-secondary/20"
          >
            Verify Now
          </motion.button>
        </Link>
        <div className="md:hidden">
            <Menu size={24} className="text-on-surface" />
        </div>
      </div>
    </nav>
  );
}
