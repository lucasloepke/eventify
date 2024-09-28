// components/ui/button.tsx
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button 
      className="px-4 py-2 bg-black text-white rounded hover:bg-blue-800 transition-colors"
      {...props}
    >
      {children}
    </button>
  )
}