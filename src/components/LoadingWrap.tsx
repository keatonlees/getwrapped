import React from "react";

const LoadingWrap = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center bg-base-100">
      <span className="loading loading-dots loading-lg"></span>
      <h1 className="font-yeseva text-4xl font-bold mb-4 text-shadow-psm shadow-neutral">
        Getting your wrap ready
      </h1>
    </div>
  );
};

export default LoadingWrap;
