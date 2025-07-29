import type { Coach } from "../../data/types";

/**
 * TurnIndicator - Shows who is currently selecting their draft position
 * Displays different messages based on whether it's the user's turn
 */
type TurnIndicatorProps = {
  currentCoach?: Coach;
  isUserTurn: boolean;
};

export default function TurnIndicator({ currentCoach, isUserTurn }: TurnIndicatorProps) {
  // If there's no current coach, it means the draft is complete
  if (!currentCoach) {
    return (
      <div className="bg-theme-bg-secondary p-4 rounded-lg mb-6">
        <div className="text-center">
          <p className="text-lg">
            <span className="text-theme-secondary font-bold">Draft complete!</span>
            <span className="text-theme-text-secondary"> All coaches have selected their positions.</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-bg-secondary p-4 rounded-lg mb-6">
      <div className="text-center text-lg">
        {/* Show current coach with highlight */}
        <p className="text-theme-primary font-bold">
          Current turn: {currentCoach.name}
        </p>
        
        {/* Instructions for selection */}
        <p className="text-theme-text-secondary">
          {isUserTurn ? "Select a draft position" : "Waiting for selection..."}
        </p>
      </div>
    </div>
  );
}
