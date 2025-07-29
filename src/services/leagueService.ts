/**
 * League Service
 * 
 * Contains functions for interacting with league data.
 * Currently uses mock data and localStorage for persistence until we have a backend.
 * Structured to easily replace with API calls in the future.
 */
import { mockLeagues } from '../data/mockLeagues';
import type { League, LeagueStatus } from '../data/types';

/**
 * Get all leagues from storage
 * First checks localStorage, falls back to mock data
 */
export function getLeagues(): Record<string, League> {
  try {
    const storedLeagues = localStorage.getItem('draftorder_leagues');
    if (storedLeagues) {
      return JSON.parse(storedLeagues);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  
  // Fall back to mock data
  return { ...mockLeagues };
}

/**
 * Get a single league by ID
 */
export function getLeague(leagueId: string): League | null {
  const leagues = getLeagues();
  return leagues[leagueId] || null;
}

/**
 * Save leagues to localStorage
 */
export function saveLeagues(leagues: Record<string, League>): void {
  try {
    localStorage.setItem('draftorder_leagues', JSON.stringify(leagues));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Update a coach's draft position selection
 * 
 * @param leagueId - ID of the league
 * @param coachId - ID of the coach making the selection
 * @param position - Selected draft position
 * @returns Promise resolving to the updated league
 */
export async function updateCoachSelection(
  leagueId: string, 
  coachId: string, 
  position: number
): Promise<League> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get the league
  const leagues = getLeagues();
  const league = leagues[leagueId];
  if (!league) throw new Error('League not found');
  
  // Update coach selection and advance turn
  const updatedLeague = {
    ...league,
    coaches: league.coaches.map(coach => 
      coach.id === coachId 
        ? { ...coach, selectedPosition: position } 
        : coach
    ),
    currentTurn: league.currentTurn + 1,
    // Update status if this was the last turn
    status: league.currentTurn + 1 >= league.coaches.length 
      ? 'completed' as LeagueStatus
      : league.status
  };
  
  // Update data in storage
  leagues[leagueId] = updatedLeague;
  saveLeagues(leagues);
  
  return updatedLeague;
}
