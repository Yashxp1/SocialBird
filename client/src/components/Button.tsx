interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'px-4 py-2 rounded-xl font-medium transition duration-200';

  const variantStyles = {
    primary: 'bg-blue-500 border-blue-800 w-74 border-2 text-white hover:bg-blue-600 my-2',
    secondary: 'bg-purple-500 border-purple-800 w-74 border-2 text-white hover:bg-purple-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
    
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;  

