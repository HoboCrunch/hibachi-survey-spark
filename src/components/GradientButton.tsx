
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outline";
}

const GradientButton = ({ 
  onClick, 
  children, 
  disabled = false, 
  className = "",
  type = "button",
  variant = "default"
}: GradientButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative px-6 py-3 rounded-lg font-medium transition-all duration-300 text-white",
        variant === "default" ? "bg-gradient-to-r from-hibachi-yellow via-hibachi-orange to-hibachi-pink hover:shadow-lg" : "border border-transparent gradient-border",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
};

export default GradientButton;
