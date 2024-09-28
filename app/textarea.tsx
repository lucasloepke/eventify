// components/ui/textarea.tsx
import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <textarea 
      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black-500"
      {...props}
    />
  )
}