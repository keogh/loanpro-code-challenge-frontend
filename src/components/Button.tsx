import * as React from 'react';

interface Props extends  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({
    children,
    className,
    ...rest
  }, ref) => {
    return (
      <button
        className={`
          flex w-full justify-center rounded-md bg-indigo-600 
          px-3 py-1.5 text-sm font-semibold leading-6 text-white 
          shadow-sm hover:bg-indigo-500 focus-visible:outline 
          focus-visible:outline-2 focus-visible:outline-offset-2 
          focus-visible:outline-indigo-600
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
