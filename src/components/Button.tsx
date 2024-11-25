// button.tsx
import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'error' | 'success';

interface ButtonProps<T extends ButtonVariant> {
  variant: T;
  children: React.ReactNode;
  variantStyles: Record<T, string>;
  onClick?: () => void;  // Optional onClick handler
}

const Button = <T extends ButtonVariant>({
  variant,
  children,
  variantStyles,
  onClick,
}: ButtonProps<T>) => {
  const buttonClass = variantStyles[variant];

  return (
    <button onClick={onClick} className={`py-2 px-4 rounded-full text-white ${buttonClass}`}>
      {children}
    </button>
  );
};

export const ButtonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out',
  secondary: 'bg-gray-500 hover:bg-gray-600 transition-colors duration-300 ease-in-out',
  error: 'bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-in-out',
  success: 'bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out',
};

export default Button;
