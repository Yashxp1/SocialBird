import React, { forwardRef } from 'react';

interface InputProps {
  placeholder: string;
  type: 'text' | 'password';
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  required?:boolean,
  disabled?:boolean,
  onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  value?:string
}

const Input = forwardRef<HTMLInputElement, InputProps>( (
  {
  placeholder,
  type,
  onClick,
  variant = 'primary',
  className = '',
  required,
  disabled = false,
  onChange,
  value
}, ref) => {
  const baseStyles = 'px-2 py-1.5 rounded-md';

  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <input
    ref={ref}
    type={type}
    onClick={onClick}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    required={required}
    disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    />
  );
});


export default Input