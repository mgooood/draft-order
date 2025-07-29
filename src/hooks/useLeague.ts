import { useState, useEffect } from 'react';
import type { League } from '../data/types';
import { getLeagueById, getLeagueByCode } from '../data/mockLeagues';

/**
 * Custom hook for fetching and managing league data
 * Abstracts data loading, error handling, and state management
 */
export function useLeague(idOrCode: string | undefined, searchByCode = false) {
  const [league, setLeague] = useState<League | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Skip fetch if no identifier provided
    if (!idOrCode) {
      setError('League ID or code is missing');
      setLoading(false);
      return;
    }
    
    // Simulate API fetch with a short delay
    const timer = setTimeout(() => {
      try {
        const leagueData = searchByCode 
          ? getLeagueByCode(idOrCode) 
          : getLeagueById(idOrCode);
        
        if (!leagueData) {
          setError('League not found');
          setLoading(false);
          return;
        }
        
        setLeague(leagueData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load league data');
        setLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [idOrCode, searchByCode]);
  
  return { league, loading, error };
}
