import { Route, Routes, HashRouter } from 'react-router-dom';

// Page imports
import HomePage from './pages/HomePage';
import LeagueSelectionPage from './pages/LeagueSelectionPage';
import ResultsPage from './pages/ResultsPage';
import AdminCreatePage from './pages/AdminCreatePage';

/**
 * Main App component with React Router configuration
 * Defines all routes for the DraftOrder application
 */
function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Home page - entry point */}
        <Route path="/" element={<HomePage />} />
        
        {/* League selection page - where coaches select their positions */}
        <Route path="/league/:id" element={<LeagueSelectionPage />} />
        
        {/* Results page - shows final draft order */}
        <Route path="/results/:id" element={<ResultsPage />} />
        
        {/* Admin page - for league creation */}
        <Route path="/admin/create" element={<AdminCreatePage />} />
        
        {/* Fallback - redirect to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
