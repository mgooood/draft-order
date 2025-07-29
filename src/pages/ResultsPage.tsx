import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import Button from '../components/ui/Button';
import { useLeague } from '../hooks/useLeague';
import type { Coach } from '../data/types';

/**
 * ResultsPage - Displays the final draft order results
 * Shows coaches organized by their selected draft positions
 */
export default function ResultsPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  // Get league data with loading and error states
  const { league, loading, error } = useLeague(id);
  
  // Function to get organized draft results
  const getDraftResults = (coaches: Coach[]) => {
    // Filter coaches who have selected a position
    const coachesWithPositions = coaches.filter(
      (coach) => coach.selectedPosition !== null
    );
    
    // Sort by selected position
    return [...coachesWithPositions].sort(
      (a, b) => (a.selectedPosition || 0) - (b.selectedPosition || 0)
    );
  };
  
  // Handle loading state
  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingState message="Loading draft results..." />
        </div>
      </PageLayout>
    );
  }
  
  // Handle error state
  if (error || !league) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <ErrorState 
            message={error || 'League not found'} 
            onRetry={() => window.location.reload()}
          />
        </div>
      </PageLayout>
    );
  }
  
  // Get organized results
  const draftResults = getDraftResults(league.coaches);
  const isComplete = league.currentTurn >= league.coaches.length;
  
  return (
    <PageLayout
      title="Draft Results"
      subtitle={league.name}
    >
      <div className="max-w-4xl mx-auto">
        {/* Status banner */}
        <div className={`
          p-4 rounded-lg mb-6 text-center
          ${isComplete 
            ? 'bg-theme-success/20 border border-theme-success/30' 
            : 'bg-theme-warning/20 border border-theme-warning/30'}
        `}>
          <p className={`
            text-lg font-semibold
            ${isComplete ? 'text-theme-success' : 'text-theme-warning'}
          `}>
            {isComplete 
              ? 'Draft selection complete!' 
              : `Draft in progress (${league.currentTurn} of ${league.coaches.length} selections made)`}
          </p>
        </div>
        
        {/* Results table */}
        <Card title="Draft Order Results" className="mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-theme-border">
                <tr>
                  <th className="p-3 text-theme-text-secondary font-medium">Position</th>
                  <th className="p-3 text-theme-text-secondary font-medium">Coach</th>
                  <th className="p-3 text-theme-text-secondary font-medium">Previous Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {draftResults.length > 0 ? (
                  draftResults.map((coach) => (
                    <tr key={coach.id} className="hover:bg-theme-bg-tertiary/50">
                      <td className="p-3 font-semibold text-theme-primary">
                        {coach.selectedPosition}
                      </td>
                      <td className="p-3">{coach.name}</td>
                      <td className="p-3 text-theme-text-muted">
                        {coach.previousRank === 1 ? '1st' : 
                         coach.previousRank === 2 ? '2nd' : 
                         coach.previousRank === 3 ? '3rd' : 
                         `${coach.previousRank}th`}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-theme-text-muted">
                      No draft positions have been selected yet
                    </td>
                  </tr>
                )}
                
                {/* Show remaining coaches (who haven't picked yet) */}
                {!isComplete && (
                  <>
                    {league.coaches
                      .filter((coach) => coach.selectedPosition === null)
                      .sort((a, b) => a.previousRank - b.previousRank)
                      .map((coach) => (
                        <tr key={coach.id} className="bg-theme-bg-tertiary/30 text-theme-text-muted">
                          <td className="p-3">
                            <span className="inline-block px-2 py-1 rounded-md bg-theme-bg-tertiary">
                              Pending
                            </span>
                          </td>
                          <td className="p-3">{coach.name}</td>
                          <td className="p-3">
                            {coach.previousRank === 1 ? '1st' : 
                             coach.previousRank === 2 ? '2nd' : 
                             coach.previousRank === 3 ? '3rd' : 
                             `${coach.previousRank}th`}
                          </td>
                        </tr>
                      ))
                    }
                  </>
                )}
              </tbody>
            </table>
          </div>
        </Card>
        
        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between mt-8">
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          
          <div className="flex gap-3">
            {!isComplete && (
              <Button 
                variant="secondary"
                onClick={() => navigate(`/league/${league.id}`)}
              >
                Back to Selection
              </Button>
            )}
            
            <Button 
              variant="primary"
              onClick={() => {
                alert('Export functionality would go here in the real app');
              }}
            >
              Export Results
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
