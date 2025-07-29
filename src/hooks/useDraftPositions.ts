import { useMemo } from 'react';
import type { League } from '../data/types';

/**
 * Custom hook to manage draft position calculations
 * Handles determining available positions and other selection logic
 */
export function useDraftPositions(league: League | null) {
  // Compute available and selected positions
  const { availablePositions, selectedPositions, currentCoach, isComplete } = useMemo(() => {
    if (!league) {
      return { 
        availablePositions: [], 
        selectedPositions: [], 
        currentCoach: undefined,
        isComplete: false
      };
    }

    // Get the total number of positions (equal to number of coaches)
    const totalPositions = league.coaches.length;
    
    // Find all positions that have been selected already
    const selected = league.coaches
      .filter(coach => coach.selectedPosition !== null)
      .map(coach => coach.selectedPosition) as number[];
    
    // Available positions are those not yet selected
    const available = Array.from({ length: totalPositions }, (_, i) => i + 1)
      .filter(pos => !selected.includes(pos));
    
    // Find the current coach whose turn it is (if any)
    const current = league.currentTurn < league.coaches.length
      ? league.coaches[league.currentTurn]
      : undefined;
    
    // Determine if the draft is complete
    const isDraftComplete = league.currentTurn >= league.coaches.length || 
                           league.status === 'completed';
    
    return { 
      availablePositions: available, 
      selectedPositions: selected,
      currentCoach: current,
      isComplete: isDraftComplete
    };
  }, [league]);
  
  // For demo purposes, we'll assume it's the user's turn if there is a current coach
  const isUserTurn = !!currentCoach;
  
  return {
    availablePositions,
    selectedPositions,
    currentCoach,
    isUserTurn,
    isComplete
  };
}
