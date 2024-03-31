import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  active: boolean;
}

const ErrorMessage: React.FC<Props> = ({ active, children, ...rest }) => {
  if (!active) {
    return null;
  }

  return (
    <p className="mt-2 text-sm text-red-600" {...rest}>
      {children}
    </p>
  );
};

export default ErrorMessage;
