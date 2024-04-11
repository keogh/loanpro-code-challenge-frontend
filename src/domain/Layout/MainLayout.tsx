import * as React from 'react';

type Props = {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <main className="pt-32 bg-gray-300 h-[100vh]">
      <div
        className={`
          mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8
        `}
      >
        <div
          className={`rounded-lg bg-white px-5 py-6 shadow sm:px-6`}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
