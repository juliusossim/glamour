import { PropsWithChildren } from 'react';

const DisplayWidth: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full max-w-7xl px-5 sm:px-6 md:px-10 lg:px-14 flex flex-col items-center sm:items-start">
      {children}
    </div>
  );
};

export default DisplayWidth;
