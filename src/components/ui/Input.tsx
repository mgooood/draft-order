import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

/**
 * Input - Reusable form input component with consistent styling
 * Supports labels, error messages, and various input types
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = true, className = '', id, ...rest }, ref) => {
    // Generate an ID if one wasn't provided
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).slice(2, 11)}`;
    
    // Base classes for the input
    const inputClasses = `
      w-full px-4 py-2 rounded-lg border
      bg-theme-bg-tertiary text-theme-text-primary
      focus:outline-none focus:ring-2 focus:ring-theme-primary/50
      ${error ? 'border-theme-text-error' : 'border-theme-border'}
      ${className}
    `;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-theme-text-secondary">
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...rest}
        />
        
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-theme-text-error">
            {error}
          </p>
        )}
        
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-theme-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
