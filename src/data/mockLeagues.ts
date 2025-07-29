/**
 * Mock data for demo leagues
 * This file contains sample league data for testing and demo purposes
 */
import type { League } from './types';

// Demo league inspired by The Flintstones
export const flintstonesLeague: League = {
  id: 'flint123',
  name: 'Bedrock Fantasy League',
  code: 'BEDROCK',
  currentTurn: 0, // First coach's turn
  coaches: [
    {
      id: 'fred1',
      name: 'Fred Flintstone',
      previousRank: 4, // 4th place last year (picks first)
      selectedPosition: null,
    },
    {
      id: 'barney1',
      name: 'Barney Rubble',
      previousRank: 3, // 3rd place last year (picks second)
      selectedPosition: null,
    },
    {
      id: 'wilma1',
      name: 'Wilma Flintstone',
      previousRank: 2, // 2nd place last year (picks third)
      selectedPosition: null,
    },
    {
      id: 'betty1',
      name: 'Betty Rubble',
      previousRank: 1, // 1st place last year (picks last)
      selectedPosition: null,
    },
    {
      id: 'dino1',
      name: 'Dino',
      previousRank: 5, // New player, arbitrary pick order
      selectedPosition: null,
    },
    {
      id: 'bambam1',
      name: 'Bam Bam',
      previousRank: 6, // New player, arbitrary pick order
      selectedPosition: null,
    },
    {
      id: 'pebbles1',
      name: 'Pebbles',
      previousRank: 7, // New player, arbitrary pick order
      selectedPosition: null,
    },
    {
      id: 'mrslate1',
      name: 'Mr. Slate',
      previousRank: 8, // New player, arbitrary pick order
      selectedPosition: null,
    },
    {
      id: 'gazoo1',
      name: 'The Great Gazoo',
      previousRank: 9, // New player, arbitrary pick order
      selectedPosition: null,
    },
    {
      id: 'hoppy1',
      name: 'Hoppy',
      previousRank: 10, // New player, arbitrary pick order
      selectedPosition: null,
    },
    {
      id: 'rockhead1',
      name: 'Rock Head',
      previousRank: 11, // New player, arbitrary pick order
      selectedPosition: null,
    },
    {
      id: 'joe1',
      name: 'Joe Rockhead',
      previousRank: 12, // New player, arbitrary pick order
      selectedPosition: null,
    },
  ],
  createdAt: '2025-07-27T14:30:00Z',
  status: 'in-progress',
};

// Demo league with completed selections
export const completedLeague: League = {
  id: 'complete123',
  name: 'Completed Demo League',
  code: 'COMPLETE',
  currentTurn: 12, // All turns completed
  coaches: [
    {
      id: 'coach1',
      name: 'Coach Smith',
      previousRank: 4,
      selectedPosition: 1,
    },
    {
      id: 'coach2',
      name: 'Coach Johnson',
      previousRank: 3,
      selectedPosition: 5,
    },
    {
      id: 'coach3',
      name: 'Coach Williams',
      previousRank: 2,
      selectedPosition: 3,
    },
    {
      id: 'coach4',
      name: 'Coach Brown',
      previousRank: 1,
      selectedPosition: 10,
    },
    {
      id: 'coach5',
      name: 'Coach Jones',
      previousRank: 8,
      selectedPosition: 2,
    },
    {
      id: 'coach6',
      name: 'Coach Davis',
      previousRank: 7,
      selectedPosition: 4,
    },
    {
      id: 'coach7',
      name: 'Coach Wilson',
      previousRank: 6,
      selectedPosition: 7,
    },
    {
      id: 'coach8',
      name: 'Coach Taylor',
      previousRank: 5,
      selectedPosition: 8,
    },
    {
      id: 'coach9',
      name: 'Coach Anderson',
      previousRank: 12,
      selectedPosition: 6,
    },
    {
      id: 'coach10',
      name: 'Coach Thomas',
      previousRank: 11,
      selectedPosition: 9,
    },
    {
      id: 'coach11',
      name: 'Coach Jackson',
      previousRank: 10,
      selectedPosition: 11,
    },
    {
      id: 'coach12',
      name: 'Coach White',
      previousRank: 9,
      selectedPosition: 12,
    },
  ],
  createdAt: '2025-07-25T10:15:00Z',
  status: 'completed',
};

// Collection of all mock leagues
export const mockLeagues: { [key: string]: League } = {
  [flintstonesLeague.id]: flintstonesLeague,
  [completedLeague.id]: completedLeague,
};

/**
 * Utility function to get a league by ID
 * @param id The league ID to search for
 * @returns The league object or undefined if not found
 */
export const getLeagueById = (id: string | undefined): League | undefined => {
  if (!id) return undefined;
  return mockLeagues[id];
};

/**
 * Utility function to get a league by code
 * @param code The league code to search for
 * @returns The league object or undefined if not found
 */
export const getLeagueByCode = (code: string): League | undefined => {
  if (!code) return undefined;
  return Object.values(mockLeagues).find(
    (league) => league.code.toLowerCase() === code.toLowerCase()
  );
};
