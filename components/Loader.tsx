
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>Analyzing...</span>
    </div>
  );
};
