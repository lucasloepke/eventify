import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button 
      className="flex items-center px-4 py-2 bg-black text-white rounded 
                 border-2 border-transparent
                 hover:bg-black hover:text-white hover:border-[#eed532]
                 transition-all duration-300"
      {...props}
    >
      {children}
    </button>
  )
}