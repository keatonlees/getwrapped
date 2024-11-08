import React from "react";

const LoadingWrap = async () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <span className="loading loading-dots loading-lg"></span>
      <div className="text-2xl font-bold">Getting Your Wrap Ready</div>
    </div>
  );
};

export default LoadingWrap;
