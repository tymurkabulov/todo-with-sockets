import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded">
      <div
        className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar; 