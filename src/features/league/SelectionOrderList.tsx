import type { Coach } from "../../data/types";

/**
 * SelectionOrderList - Displays the coaches in their selection order
 * Shows previous rank, selection status, and highlights the current turn
 */
type SelectionOrderListProps = {
  coaches: Coach[];
  currentTurn: number;
};

export default function SelectionOrderList({ coaches, currentTurn }: SelectionOrderListProps) {
  /**
   * Format rank with proper suffix (1st, 2nd, 3rd, etc.)
   */
  const formatRank = (rank: number): string => {
    const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th';
    return `${rank}${suffix}`;
  };
  
  // Custom sorting function to implement draft order logic:
  // - 4th place from last year picks first
  // - 5th, 6th, etc. pick next
  // - 3rd, 2nd, 1st pick at the end
  // - Any coaches with rank 0 (new coaches) pick last
  const sortedCoaches = [...coaches].sort((a, b) => {
    // Handle new coaches (rank 0 or undefined) - they always go last
    if (!a.previousRank || a.previousRank === 0) return 1;
    if (!b.previousRank || b.previousRank === 0) return -1;
    
    // Special handling for top 4 finishers
    if (a.previousRank <= 3 && b.previousRank <= 3) {
      // Among top 3, LOWER ranks pick later (1st is last, 2nd is second-last, 3rd is third-last)
      // So we do descending sort: 3rd, 2nd, 1st = 10th, 11th, 12th pick
      return b.previousRank - a.previousRank;
    } else if (a.previousRank <= 3) {
      // Top 3 pick after everyone else
      return 1;
    } else if (b.previousRank <= 3) {
      // Everyone else picks before top 3
      return -1;
    } else if (a.previousRank === 4 && b.previousRank !== 4) {
      // 4th place picks first
      return -1;
    } else if (b.previousRank === 4 && a.previousRank !== 4) {
      // Everyone else picks after 4th place
      return 1;
    } else {
      // All other ranks pick in order of rank (higher ranks pick earlier)
      return a.previousRank - b.previousRank;
    }
  });
  
  return (
    <div className="space-y-2">
      {sortedCoaches.map((coach, index) => (
        <div 
          key={coach.id}
          className={`flex items-center justify-between p-3 rounded-lg ${
            index === currentTurn 
              ? 'bg-theme-bg-highlight/20 border border-theme-primary/30' 
              : 'bg-theme-bg-tertiary'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-6 h-6 rounded-full bg-theme-primary/20 text-theme-text-primary text-center text-sm">
              {index + 1}
            </span>
            <span>{coach.name}</span>
            <span className="text-xs text-theme-text-muted ml-2">
              {formatRank(coach.previousRank)} last year
            </span>
          </div>
          <div>
            {coach.selectedPosition 
              ? <span className="font-bold text-theme-primary">Position {coach.selectedPosition}</span>
              : index === currentTurn
              ? <span className="text-theme-primary">Selecting now...</span>
              : <span className="text-theme-text-muted">Waiting...</span>
            }
          </div>
        </div>
      ))}
    </div>
  );
}
