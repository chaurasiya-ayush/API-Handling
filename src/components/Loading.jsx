import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
