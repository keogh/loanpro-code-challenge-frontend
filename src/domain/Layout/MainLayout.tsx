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
      <main className="mt-4 h-5/6">
        <div
          className={`
            mx-auto max-w-7xl px-3 md:px-6 pb-6 lg:px-8 h-full
          `}
        >
          <div
            className={`rounded-lg bg-white px-5 py-6 shadow sm:px-6 h-full`}
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
