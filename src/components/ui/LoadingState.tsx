/**
 * LoadingState - Consistent loading indicator
 * Used across the application for uniform loading experience
 */
type LoadingStateProps = {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function LoadingState({ 
  message = 'Loading...', 
  size = 'md' 
}: LoadingStateProps) {
  // Size classes for the spinner
  const spinnerSizeClasses = {
    sm: 'h-4 w-4 border',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };
  
  // Size classes for the text
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin ${spinnerSizeClasses[size]} rounded-full border-theme-primary border-t-transparent mb-3`}></div>
      <p className={`text-theme-text-secondary ${textSizeClasses[size]}`}>
        {message}
      </p>
    </div>
  );
}
