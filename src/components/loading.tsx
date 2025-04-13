import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-150"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-300"></div>
        <span className="text-lg text-gray-700 ml-2">Loading dashboard...</span>
      </div>
    </div>
  );
};

export default Loading;
