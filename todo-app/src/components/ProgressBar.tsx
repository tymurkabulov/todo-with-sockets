import React from 'react';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'small' | 'large';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  showLabel = true,
  size = 'small'
}) => {
  const validProgress = Number.isFinite(progress) 
    ? Math.min(Math.max(progress, 0), 100) 
    : 0;

  const heightClass = size === 'small' ? 'h-3' : 'h-5';

  return (
    <div className="w-full">
      <div className={`bg-gray-200 rounded-full ${heightClass} dark:bg-gray-700`}>
        <div
          className={`bg-blue-500 text-xs leading-none text-center text-white rounded-full transition-all duration-300 ${heightClass}`}
          style={{ width: `${validProgress}%` }}
        >
          {showLabel && (
            <span className={`${size === 'large' ? 'text-sm' : 'text-xs'} font-medium`}>
              {validProgress}%
            </span>
          )}
        </div>
      </div>
      {!showLabel && (
        <div className="text-center text-sm text-gray-600 mt-1">
          {validProgress}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
