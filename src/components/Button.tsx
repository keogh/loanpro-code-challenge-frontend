import * as React from 'react';

interface Props extends  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({
    children,
    className,
    variant = 'primary',
    ...rest
  }, ref) => {

    let variantClassName = `
      bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600
    `;
    if (variant === 'secondary') {
      variantClassName = `
        bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 
        focus-visible:outline-gray-300
      `;
    }

    return (
      <button
        className={`
          flex w-full justify-center rounded-md  
          px-3 py-1.5 text-sm font-semibold leading-6  
          shadow-sm focus-visible:outline 
          focus-visible:outline-2 focus-visible:outline-offset-2 
          ${variantClassName}
          ${className}
        `}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
