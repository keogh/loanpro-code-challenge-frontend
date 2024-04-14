import * as React from 'react';
import {useNavigate} from "react-router-dom";

interface Props extends  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'soft';
  to?: string;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({
    to,
    variant = 'primary',
    children,
    className,
    onClick,
    ...rest
  }, ref) => {
    const navigate = useNavigate();

    let variantClassName = `
      bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600
    `;
    if (variant === 'secondary') {
      variantClassName = `
        bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 
        focus-visible:outline-gray-300
      `;
    } else if (variant === 'soft') {
      variantClassName = `
        bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus-visible:outline-indigo-50
      `;
    }

    let extraProps: Props = {};
    if (!!to) {
      extraProps.role = 'link';
    }

    const handleOnClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!!to) {
        navigate(to);
      }
      if (onClick) {
        onClick(e);
      }
    }, [navigate, onClick, to]);

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
        onClick={handleOnClick}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
