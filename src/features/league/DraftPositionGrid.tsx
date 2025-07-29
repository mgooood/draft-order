/**
 * DraftPositionGrid - Grid of selectable draft positions
 * Shows available positions in a responsive grid with visual indicators
 */
type DraftPositionGridProps = {
  totalPositions: number;
  availablePositions: number[];
  selectedPositions: number[];
  isUserTurn: boolean;
  onPositionSelect?: (position: number) => void;
};

export default function DraftPositionGrid({
  totalPositions,
  availablePositions,
  selectedPositions,
  isUserTurn,
  onPositionSelect
}: DraftPositionGridProps) {
  // Helper to determine the state of a position
  const getPositionState = (position: number) => {
    if (availablePositions.includes(position)) return 'available';
    if (selectedPositions.includes(position)) return 'selected';
    return 'unavailable';
  };
  
  return (
    <div>
      {/* Draft positions grid - responsive for all device sizes */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {Array.from({ length: totalPositions }, (_, i) => i + 1).map(position => {
          const state = getPositionState(position);
          const isAvailable = state === 'available';
          
          return (
            <button
              key={position}
              onClick={() => isAvailable && isUserTurn && onPositionSelect?.(position)}
              disabled={!isAvailable || !isUserTurn}
              className={`
                aspect-square rounded-lg font-bold text-lg transition-all
                ${isAvailable && isUserTurn
                  ? 'bg-available hover:bg-available-hover text-white cursor-pointer transform hover:scale-105'
                  : isAvailable
                  ? 'bg-available text-white cursor-not-allowed opacity-70'
                  : state === 'selected'
                  ? 'bg-taken text-white cursor-not-allowed'
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                }
              `}
              aria-label={`Draft position ${position}`}
              aria-disabled={!isAvailable || !isUserTurn}
            >
              {position}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center flex-wrap gap-4 text-sm mt-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 bg-available rounded-sm"></span>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 bg-taken rounded-sm"></span>
          <span>Taken</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 bg-slate-600 rounded-sm"></span>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
}
