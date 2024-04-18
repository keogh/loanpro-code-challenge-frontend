import * as React from 'react';
import {FlashBanner} from "../../components/Flash";
import {Header} from "../Header";

type Props = {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-full bg-gray-300 h-[100vh]">
      <Header />
      <main className="mt-4">
        <div
          className={`
            mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8
          `}
        >
          <div
            className={`rounded-lg bg-white px-5 py-6 shadow sm:px-6`}
          >
            <FlashBanner />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
