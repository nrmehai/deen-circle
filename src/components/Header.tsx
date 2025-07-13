import { Moon, User, Bell, Search, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationPicker } from "./LocationPicker";
import * as React from "react";

const Header = () => {
  const [locationInfo, setLocationInfo] = React.useState<string>('');
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [nextEvent, setNextEvent] = React.useState<{
    name: string;
    date: Date;
    timeRemaining: string;
  } | null>(null);

  const handleLocationSelect = (location: { lat: number; lng: number; radius: number; address: string }) => {
    setLocationInfo(`Showing results from ${location.radius} miles from ${location.address}`);
  };

  // Calculate time remaining until next event
  React.useEffect(() => {
    // Mock data - replace with actual user's signed up events
    const userEvents = [
      { name: "Quran Study Circle", date: new Date('2024-01-20T19:00:00') },
      { name: "Community Iftar", date: new Date('2024-01-25T18:30:00') },
      { name: "Islamic Finance Workshop", date: new Date('2024-01-30T14:00:00') }
    ];

    const now = new Date();
    const upcomingEvents = userEvents
      .filter(event => event.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    if (upcomingEvents.length > 0) {
      const next = upcomingEvents[0];
      const timeDiff = next.date.getTime() - now.getTime();
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      let timeRemaining = '';
      if (days > 0) {
        timeRemaining = `${days}d ${hours}h ${minutes}m`;
      } else if (hours > 0) {
        timeRemaining = `${hours}h ${minutes}m`;
      } else {
        timeRemaining = `${minutes}m`;
      }
      
      setNextEvent({
        name: next.name,
        date: next.date,
        timeRemaining
      });
    }

    // Update every minute
    const interval = setInterval(() => {
      // Recalculate time remaining
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Moon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Deen Circle</h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search community, events, scholars..." 
                  className="pl-10 bg-muted border-0 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 relative">
              <LocationPicker onLocationSelect={handleLocationSelect} />
              
              {/* Notifications Button */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={showNotifications ? "bg-muted" : ""}
                >
                  <Bell className="h-5 w-5" />
                  {nextEvent && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
                  )}
                </Button>
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
                    <h3 className="font-semibold text-foreground mb-3">Upcoming Events</h3>
                    {nextEvent ? (
                      <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{nextEvent.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {nextEvent.date.toLocaleDateString()} at {nextEvent.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                          <p className="text-sm font-medium text-primary mt-1">
                            Time remaining: {nextEvent.timeRemaining}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        No upcoming events signed up for
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/*Profile Button */}
              <Button variant="ghost" size="icon" onClick={() => {
                window.location.href = '/profile'; 
                }}>
                  <User className="profile" />
              </Button>
            </div>
          </div>
          
          {/* Location Info */}
          {locationInfo && (
            <div className="text-sm text-muted-foreground text-center">
              {locationInfo}
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay to close notifications when clicking outside */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;