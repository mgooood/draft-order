import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { getLeagueByCode } from '../data/mockLeagues';
import FootballIcon from '../components/icons/FootballIcon';

/**
 * HomePage - Landing page where users enter league code to join
 * This is the main entry point for coaches to access their league
 */
export default function HomePage() {
  const navigate = useNavigate();
  const [leagueCode, setLeagueCode] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  // Handle league code submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    
    // Check if it's a demo league
    const demoLeague = getLeagueByCode(leagueCode);
    
    if (demoLeague) {
      // Navigate to the demo league using React Router navigation
      navigate(`/league/${demoLeague.id}`);
    } else {
      // For now, show error for non-demo leagues
      setError('League not found. Try using a demo code: BEDROCK or COMPLETE');
    }
  };

  return (
    <PageLayout title="DraftOrder" subtitle="Fantasy Football Draft Position Selection">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
        {/* Left column - League join form */}
        <div className="max-w-md mx-auto lg:mx-0 lg:max-w-none">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-theme-text-primary text-center lg:text-left">
            Join Your League
          </h2>
          
          <Card>
            <p className="text-theme-text-secondary mb-4">
              Enter your league code to get started
            </p>
            
            {/* League code input form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter league code"
                value={leagueCode}
                onChange={(e) => setLeagueCode(e.target.value)}
                error={error}
                autoFocus
              />
              
              <Button 
                type="submit"
                fullWidth
                trailingIcon={<FootballIcon size={18} color="currentColor" />}
              >
                Join League
              </Button>
            </form>
          </Card>
          
          <div className="mt-6 text-center lg:text-left">
            <p className="text-theme-text-muted text-sm">
              League commissioner? 
              <Link 
                to="/admin/create" 
                className="text-theme-primary ml-1 cursor-pointer hover:underline"
              >
                Create a new league
              </Link>
            </p>
          </div>
        </div>

        {/* Right column - Information/Features */}
        <div className="space-y-6">
          <Card title="How It Works">
            <div className="space-y-4 text-theme-text-secondary">
              <div className="flex items-start gap-3">
                <span className="text-theme-primary p-1 rounded-full bg-theme-primary/10">
                  <FootballIcon size={20} />
                </span>
                <div>
                  <p className="font-medium">Commissioner creates league</p>
                  <p className="text-sm text-theme-text-muted">Add all coaches to your league</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-theme-primary p-1 rounded-full bg-theme-primary/10">
                  <FootballIcon size={20} color="currentColor" />
                </span>
                <div>
                  <p className="font-medium">Coaches select positions</p>
                  <p className="text-sm text-theme-text-muted">Join using league code and pick draft spots</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-theme-primary p-1 rounded-full bg-theme-primary/10">
                  <FootballIcon size={20} className="rotate-45" />
                </span>
                <div>
                  <p className="font-medium">View final draft order</p>
                  <p className="text-sm text-theme-text-muted">Results page shows the order for everyone</p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Demo league navigation section */}
          <Card className="border border-yellow-500/30">
            <h3 className="text-lg font-semibold mb-4 text-center text-yellow-400">
              🚧 Demo Leagues (For Testing)
            </h3>
            <div className="space-y-4">
              <Link 
                to="/league/flint123" 
                className="block bg-theme-bg-tertiary hover:bg-theme-bg-tertiary/90 text-theme-text-primary py-3 px-6 rounded-lg text-center transition-colors font-semibold"
              >
                Bedrock Fantasy League (In Progress)
              </Link>
              <Link 
                to="/results/complete123" 
                className="block bg-theme-bg-tertiary hover:bg-theme-bg-tertiary/90 text-theme-text-primary py-3 px-6 rounded-lg text-center transition-colors font-semibold"
              >
                Completed League Results
              </Link>
              <Link 
                to="/admin/create" 
                className="block bg-theme-primary hover:bg-theme-primary/90 text-theme-text-primary py-3 px-6 rounded-lg text-center transition-colors font-semibold"
              >
                Admin Create Page
              </Link>
              <div className="p-3 bg-theme-bg-tertiary rounded-lg text-center text-theme-text-secondary text-sm">
                Demo Codes: <span className="text-yellow-300 font-mono">BEDROCK</span> or <span className="text-yellow-300 font-mono">COMPLETE</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
