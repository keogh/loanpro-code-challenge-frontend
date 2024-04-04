import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  active: boolean;
  variant?: 'errorInput' | 'errorBox';
}

const ErrorMessage: React.FC<Props> = ({
  active,
  children,
  className,
  variant = 'errorInput',
  ...rest
}) => {
  if (!active) {
    return null;
  }

  if (variant === 'errorBox') {
    return (
      <div
        className={`
          rounded-md border border-red-700 bg-red-100 
          py-3 px-4 text-sm text-red-700
          ${className}
        `}
        {...rest}
      >
        {children}
      </div>
    )
  }

  return (
    <p className={`mt-2 text-sm text-red-600 ${className}`} {...rest}>
      {children}
    </p>
  );
};

export default ErrorMessage;
