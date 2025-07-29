import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import type { Coach } from '../data/types';

/**
 * AdminCreatePage - Allows commissioners to create new leagues
 * Includes forms for league details and coach roster management
 */
export default function AdminCreatePage() {
  // League form state
  const [leagueName, setLeagueName] = useState('');
  const [leagueCode, setLeagueCode] = useState('');
  
  // Coach management state
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [newCoachName, setNewCoachName] = useState('');
  const [newCoachRank, setNewCoachRank] = useState<number | ''>('');
  
  // Form validation errors
  const [leagueErrors, setLeagueErrors] = useState({
    name: '',
    code: ''
  });
  const [coachErrors, setCoachErrors] = useState({
    name: '',
    rank: ''
  });
  
  // Handle adding a new coach
  const handleAddCoach = () => {
    // Validate inputs
    let hasErrors = false;
    const errors = {
      name: '',
      rank: ''
    };
    
    if (!newCoachName.trim()) {
      errors.name = 'Coach name is required';
      hasErrors = true;
    }
    
    if (newCoachRank === '') {
      errors.rank = 'Previous rank is required';
      hasErrors = true;
    } else if (typeof newCoachRank === 'number' && (newCoachRank < 0 || newCoachRank > 20)) {
      errors.rank = 'Rank must be between 0 and 20';
      hasErrors = true;
    }
    
    // Check for duplicate rank
    if (typeof newCoachRank === 'number' && coaches.some(coach => coach.previousRank === newCoachRank)) {
      errors.rank = 'This rank is already taken';
      hasErrors = true;
    }
    
    setCoachErrors(errors);
    if (hasErrors) return;
    
    // Add new coach
    const newCoach: Coach = {
      id: `coach-${Date.now()}`, // Generate a unique ID
      name: newCoachName,
      previousRank: typeof newCoachRank === 'number' ? newCoachRank : 1,
      selectedPosition: null
    };
    
    setCoaches([...coaches, newCoach]);
    
    // Reset form
    setNewCoachName('');
    setNewCoachRank('');
  };
  
  // Remove a coach from the list
  const handleRemoveCoach = (coachId: string) => {
    setCoaches(coaches.filter(coach => coach.id !== coachId));
  };
  
  // Handle creating the league
  const handleCreateLeague = () => {
    // Validate form
    let hasErrors = false;
    const errors = {
      name: '',
      code: ''
    };
    
    if (!leagueName.trim()) {
      errors.name = 'League name is required';
      hasErrors = true;
    }
    
    if (!leagueCode.trim()) {
      errors.code = 'League code is required';
      hasErrors = true;
    } else if (leagueCode.length < 3) {
      errors.code = 'League code must be at least 3 characters';
      hasErrors = true;
    }
    
    // Ensure we have at least 2 coaches
    if (coaches.length < 2) {
      alert('You need at least 2 coaches to create a league');
      hasErrors = true;
    }
    
    setLeagueErrors(errors);
    if (hasErrors) return;
    
    // In a real app, would send data to backend here
    console.log('Creating league:', {
      name: leagueName,
      code: leagueCode,
      coaches
    });
    
    // Show success message
    alert(`League "${leagueName}" created successfully! In a real app, you would be redirected to the league page now.`);
  };
  
  return (
    <PageLayout
      title="Create League"
      subtitle="Commissioner Dashboard"
    >
      <div className="max-w-2xl mx-auto">
        {/* League details section */}
        <Card title="League Details" className="mb-6">
          <div className="space-y-4">
            <Input
              label="League Name"
              placeholder="Enter league name"
              value={leagueName}
              onChange={e => setLeagueName(e.target.value)}
              error={leagueErrors.name}
              fullWidth
            />
            
            <Input
              label="League Code"
              placeholder="Short code for league access (e.g., LIONS2025)"
              value={leagueCode}
              onChange={e => setLeagueCode(e.target.value)}
              error={leagueErrors.code}
              helperText="Coaches will use this code to access the league"
              fullWidth
            />
          </div>
        </Card>
        
        {/* Coaches section */}
        <Card title="Manage Coaches" className="mb-6">
          <div className="space-y-6">
            {/* Add coach form */}
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-grow">
                <Input
                  label="Coach Name"
                  placeholder="Enter name"
                  value={newCoachName}
                  onChange={e => setNewCoachName(e.target.value)}
                  error={coachErrors.name}
                  fullWidth
                />
              </div>
              <div className="sm:w-32">
                <Input
                  label="Previous Rank"
                  type="number"
                  placeholder="Rank"
                  value={newCoachRank}
                  onChange={e => {
                    const val = e.target.value;
                    setNewCoachRank(val === '' ? '' : parseInt(val));
                  }}
                  error={coachErrors.rank}
                  helperText="4th place picks first, followed by 5th+. Enter 0 for new coaches."
                  fullWidth
                />
              </div>
              <div className="mb-4">
                <Button onClick={handleAddCoach}>
                  Add Coach
                </Button>
              </div>
            </div>
            
            {/* Coach list */}
            <div>
              <h3 className="text-sm font-medium text-theme-text-secondary mb-2">
                Coaches ({coaches.length})
              </h3>
              
              {coaches.length === 0 ? (
                <div className="text-center py-6 bg-theme-bg-tertiary/50 rounded-lg text-theme-text-muted">
                  No coaches added yet
                </div>
              ) : (
                <div className="divide-y divide-theme-border">
                  {coaches
                    .sort((a, b) => a.previousRank - b.previousRank)
                    .map(coach => (
                      <div 
                        key={coach.id}
                        className="py-3 px-2 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-6 h-6 bg-theme-primary/20 rounded-full text-center">
                            {coach.previousRank}
                          </span>
                          <span>{coach.name}</span>
                        </div>
                        
                        <Button 
                          variant="text" 
                          onClick={() => handleRemoveCoach(coach.id)}
                          aria-label={`Remove ${coach.name}`}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                </div>
              )}
            </div>
            
            <div className="bg-theme-bg-secondary/70 p-4 rounded-lg text-sm text-theme-text-muted">
              <p><strong>Note:</strong> Coaches will select draft positions in order of their previous year's ranking 
              (worst to first). The coach with the highest rank (worst record) will pick first.</p>
            </div>
          </div>
        </Card>
        
        {/* Create league button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between mt-8">
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            Cancel
          </Button>
          
          <Button 
            variant="primary"
            onClick={handleCreateLeague}
            disabled={coaches.length < 2}
          >
            Create League
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
