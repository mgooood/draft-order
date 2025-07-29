import { Link } from 'react-router-dom';
import FootballIcon from '../icons/FootballIcon';

/**
 * Header - Consistent page header with title and optional subtitle
 * Displays the app title and navigation elements
 */
type HeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function Header({ title = 'DraftOrder', subtitle }: HeaderProps) {
  return (
    <header className="w-full py-3 md:py-5 bg-gray-900 text-white border-b border-gray-800">
      <div className="container mx-auto px-4">
        {/* Flex container for header content */}
        <div className="flex justify-between items-center">
          {/* Left side with title and subtitle */}
          <div>
            <Link to="/" className="inline-block">
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-400">
                {title}
              </h1>
            </Link>
            
            {subtitle && (
              <p className="text-sm md:text-base text-gray-300 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Right side with football icon */}
          <div>
            <Link 
              to="/" 
              className="text-white transition-transform hover:scale-110 block" 
              aria-label="Go to homepage"
            >
              <FootballIcon 
                size={32} 
                className="md:hidden" 
                color="white" 
              />
              <FootballIcon 
                size={48} 
                className="hidden md:block" 
                color="white" 
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
