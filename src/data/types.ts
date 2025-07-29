/**
 * Type definitions for the DraftOrder application
 * Defines all data structures used throughout the app
 */

/**
 * Coach - Represents a coach in a fantasy football league
 */
export interface Coach {
  id: string;
  name: string;
  previousRank: number; // Previous year's ranking (determines selection order)
  selectedPosition: number | null; // Draft position they selected, null if not selected yet
}

/**
 * League status
 */
export type LeagueStatus = 'pending' | 'in-progress' | 'completed';

/**
 * League - Represents a fantasy football league
 */
export interface League {
  id: string;
  name: string;
  code: string; // Short code for easy league access
  currentTurn: number; // Index of coach currently selecting
  coaches: Coach[];
  createdAt: string; // ISO date string
  status: LeagueStatus;
}
