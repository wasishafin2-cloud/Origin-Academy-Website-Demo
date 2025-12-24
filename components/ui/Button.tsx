import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 border border-transparent",
    secondary: "bg-white text-indigo-700 hover:bg-gray-50 border border-gray-200 shadow-sm",
    outline: "bg-transparent border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50",
    accent: "bg-yellow-400 text-slate-900 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/30 border border-transparent",
    glass: "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 hover:shadow-lg",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-10 py-3.5 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};