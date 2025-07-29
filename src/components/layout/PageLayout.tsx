import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * PageLayout - Main layout component used across all pages
 * Provides consistent structure with header and footer
 */
type PageLayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

export default function PageLayout({ 
  children, 
  title = 'DraftOrder',
  subtitle 
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-theme-bg-primary text-theme-text-primary">
      <Header title={title} subtitle={subtitle} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
