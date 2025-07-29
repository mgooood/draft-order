import type { ReactNode } from 'react';

/**
 * Card - Reusable container component with consistent styling
 * Provides consistent card UI for content sections
 */
type CardProps = {
  children: ReactNode;
  title?: string | ReactNode;
  className?: string;
  variant?: 'default' | 'highlight';
};

export default function Card({ children, title, className = '', variant = 'default' }: CardProps) {
  // Determine background based on variant
  const bgClass = variant === 'highlight' 
    ? 'bg-theme-bg-secondary border-theme-primary/30'
    : 'bg-theme-bg-secondary';
  
  return (
    <div className={`rounded-lg shadow ${bgClass} ${className}`}>
      {title && (
        <div className="p-4 border-b border-theme-border">
          {typeof title === 'string' ? (
            <h2 className="text-xl font-bold">{title}</h2>
          ) : (
            title
          )}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
