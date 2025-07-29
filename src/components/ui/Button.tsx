import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button - Reusable button component with different variants
 * Implements consistent styling with proper accessibility
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  leadingIcon,
  trailingIcon,
  ...rest
}: ButtonProps) {
  // Base classes always applied
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Classes based on variant
  const variantClasses = {
    primary: 'bg-theme-primary hover:bg-theme-primary/90 text-white focus:ring-theme-primary/50',
    secondary: 'bg-theme-secondary hover:bg-theme-secondary/90 text-white focus:ring-theme-secondary/50',
    outline: 'border border-theme-border bg-transparent hover:bg-theme-bg-tertiary text-theme-text-primary focus:ring-theme-primary/50',
    text: 'bg-transparent hover:bg-theme-bg-tertiary text-theme-text-secondary hover:text-theme-text-primary focus:ring-theme-primary/50',
  };
  
  // Classes based on size
  const sizeClasses = {
    sm: 'text-xs px-3 py-1',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-3',
  };
  
  // Classes for full width
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Classes for loading/disabled state
  const stateClasses = (isLoading || disabled) ? 'opacity-70 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${stateClasses} ${className} flex items-center justify-center`}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="mr-2">Loading...</span>
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
        </div>
      ) : (
        <>
          {leadingIcon && (
            <span className="mr-2 -ml-1 inline-flex shrink-0">
              {leadingIcon}
            </span>
          )}
          {children}
          {trailingIcon && (
            <span className="ml-2 -mr-1 inline-flex shrink-0">
              {trailingIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
