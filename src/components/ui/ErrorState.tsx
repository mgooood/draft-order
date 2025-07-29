import type{ ReactNode } from 'react';
import Button from './Button';

/**
 * ErrorState - Consistent error display component
 * Shows error messages with optional retry action
 */
type ErrorStateProps = {
  message?: string | ReactNode;
  onRetry?: () => void;
};

export default function ErrorState({ 
  message = 'An error occurred', 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="text-center p-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-text-error/10 mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-8 h-8 text-theme-text-error"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      
      <div className="text-theme-text-error mb-4">
        {message}
      </div>
      
      {onRetry && (
        <Button 
          variant="outline"
          onClick={onRetry}
          aria-label="Retry"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
