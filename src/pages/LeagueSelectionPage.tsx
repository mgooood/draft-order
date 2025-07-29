import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import DraftPositionGrid from '../features/league/DraftPositionGrid';
import TurnIndicator from '../features/league/TurnIndicator';
import SelectionOrderList from '../features/league/SelectionOrderList';
import { useLeague } from '../hooks/useLeague';
import { useDraftPositions } from '../hooks/useDraftPositions';
import Button from '../components/ui/Button';
import { updateCoachSelection } from '../services/leagueService';
import type { League } from '../data/types';

/**
 * LeagueSelectionPage - Main interface where coaches select their draft positions
 * Shows available positions in a mobile-first grid layout
 */
export default function LeagueSelectionPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  
  // Get initial league data with loading and error states
  const { league: initialLeague, loading, error } = useLeague(id);
  
  // Add local state to manage the league data after updates
  const [league, setLeague] = useState<League | null>(initialLeague);
  
  // Keep the local state in sync with initialLeague when it loads
  useEffect(() => {
    if (initialLeague) {
      setLeague(initialLeague);
    }
  }, [initialLeague]);
  
  // Get draft position data based on current league state
  const { 
    availablePositions,
    selectedPositions,
    currentCoach,
    isUserTurn
  } = useDraftPositions(league);
  
  // Handle position selection
  const handleSelectPosition = async (position: number) => {
    if (!league || !currentCoach) return;
    
    try {
      // Show loading indicator or disable buttons if needed
      // Could add a loading state here: setIsLoading(true);
      
      // Call the service function to update the selection
      const updatedLeague = await updateCoachSelection(
        league.id,
        currentCoach.id,
        position
      );
      
      console.log(`Selected position ${position} for ${currentCoach.name}`);
      
      // Update the local state with the new league data
      // This will trigger a re-render with the updated positions
      setLeague(updatedLeague);
      
      // If this was the last selection, navigate to results page
      if (updatedLeague.currentTurn >= updatedLeague.coaches.length) {
        navigate(`/results/${updatedLeague.id}`);
      }
      
      // Hide loading indicator
      // if we added one: setIsLoading(false);
    } catch (error) {
      console.error('Error making selection:', error);
      alert('There was an error making your selection. Please try again.');
      // Hide loading indicator on error
      // setIsLoading(false);
    }
  };
  
  // Handle loading state
  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingState message="Loading league data..." />
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
  
  return (
    <PageLayout
      title="DraftOrder"
      subtitle={league.name}
    >
      <div className="max-w-4xl mx-auto">
        {/* Current turn indicator */}
        <TurnIndicator 
          currentCoach={currentCoach}
          isUserTurn={isUserTurn}
        />
        
        {/* Draft positions grid */}
        <Card title="Draft Positions" className="mb-6">
          <DraftPositionGrid 
            totalPositions={league.coaches.length}
            availablePositions={availablePositions}
            selectedPositions={selectedPositions}
            isUserTurn={isUserTurn}
            onPositionSelect={handleSelectPosition}
          />
        </Card>
        
        {/* Selection order list */}
        <Card title="Selection Order" className="mb-6">
          <SelectionOrderList 
            coaches={league.coaches}
            currentTurn={league.currentTurn}
          />
        </Card>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          
          <Button 
            variant="primary"
            onClick={() => navigate(`/results/${league.id}`)}
          >
            View Current Results
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
