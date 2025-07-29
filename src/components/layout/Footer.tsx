/**
 * Footer - Consistent page footer
 * Displays copyright information and other footer links
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 border-t border-theme-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-theme-text-muted">
          DraftOrder {currentYear} • Fantasy Football Draft Position Selection
        </p>
      </div>
    </footer>
  );
}
