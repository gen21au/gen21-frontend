import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'lg', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-12 w-12'
  };

  const containerClasses = {
    sm: 'inline-flex items-center justify-center',
    md: 'flex justify-center items-center',
    lg: 'flex justify-center items-center h-64'
  };

  return (
    <div className={`${containerClasses[size]} ${className}`}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default Spinner;
