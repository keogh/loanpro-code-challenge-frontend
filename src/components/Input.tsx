import * as React from 'react';

enum InputVariants {
  PRIMARY = 'primary',
  ERROR = 'error',
}
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'error',
  error?: boolean,
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({
    className,
    variant = InputVariants.PRIMARY,
    error = false,
    ...rest
  }, ref) => {
    let innerClassName = `
      block w-full rounded-md border-0 py-1.5 
      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
      placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
      focus:ring-indigo-600 sm:text-sm sm:leading-6
    `;
    if (error || variant === InputVariants.ERROR) {
      innerClassName = `
        block w-full rounded-md border-0 py-1.5 
        pr-10 text-red-900 ring-1 ring-inset ring-red-300 
        placeholder:text-red-300 focus:ring-2 focus:ring-inset 
        focus:ring-red-500 sm:text-sm sm:leading-6
      `;
    }

    innerClassName = `${innerClassName} ${className}`;

    return (
      <input
        className={innerClassName}
        {...rest}
        ref={ref}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
