# DraftOrder Project Decisions

This document tracks key architectural and implementation decisions for the DraftOrder application.

## Draft Order Logic

- 4th place from last year picks first
- 5th, 6th, etc. pick next in ascending rank order
- 3rd place picks third-to-last
- 2nd place picks second-to-last
- 1st place picks last
- New coaches (rank 0) pick after all ranked coaches

## Backend Integration Approach

### Current Mock Implementation

For the initial frontend implementation without a backend, we're using the following pattern:

1. **Service Layer Abstraction:**
   - Create separate service functions that mimic API calls
   - Isolate data operations from UI components
   - Handle asynchronous behavior with proper promises/async-await

2. **Mock Data Operations:**
   ```typescript
   // Example service function
   async function updateCoachSelection(leagueId: string, coachId: string, position: number) {
     // Simulate network delay
     await new Promise(resolve => setTimeout(resolve, 300));
     
     // Get the league
     const league = mockLeagues[leagueId];
     if (!league) throw new Error('League not found');
     
     // Update coach selection and advance turn
     const updatedLeague = {
       ...league,
       coaches: league.coaches.map(coach => 
         coach.id === coachId 
           ? { ...coach, selectedPosition: position } 
           : coach
       ),
       currentTurn: league.currentTurn + 1
     };
     
     // Update the mock data
     mockLeagues[leagueId] = updatedLeague;
     
     return updatedLeague;
   }
   ```

3. **Component Usage:**
   ```typescript
   // Handle position selection
   const handleSelectPosition = async (position: number) => {
     if (!league || !currentCoach) return;
     
     try {
       const updatedLeague = await updateCoachSelection(
         league.id, 
         currentCoach.id, 
         position
       );
       
       console.log('Selection successful:', updatedLeague);
       
       // Force refresh to show updated state 
       window.location.reload();
     } catch (error) {
       console.error('Error making selection:', error);
     }
   };
   ```

### Future Backend Integration

When implementing a real backend, we will:

1. Replace the mock service functions with actual API calls
2. Maintain the same function signatures and return types
3. Add proper authentication and error handling
4. Use React state/context or Redux for state management instead of page refreshes

This approach ensures minimal changes to the component code when transitioning from mock data to a real API.
