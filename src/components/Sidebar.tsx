import { 
  Home, 
  Calendar, 
  Users, 
  BookOpen, 
  Heart, 
  MapPin, 
  Star,
  MessageCircle,
  Compass,
  Settings,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { LocationPicker } from "./LocationPicker";
import { fetchPrayerTimes, getUserTimezone } from "@/lib/prayerTimes";
import * as React from "react";

interface PrayerTime {
  name: string;
  time: string;
  passed: boolean;
  current: boolean;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [prayerTimes, setPrayerTimes] = React.useState<PrayerTime[] | null>(null);
  const [locationInfo, setLocationInfo] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const navigationItems = [
    { icon: Home, label: "Feed", path: "/" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: BookOpen, label: "Learning", path: "/learning" },
    { icon: Heart, label: "Donation", path: "/charity" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
  ];

  const handleLocationSelect = async (locationData: { lat: number; lng: number; radius: number; address: string }) => {
    setIsLoading(true);
    try {
      const timezone = getUserTimezone();
      const times = await fetchPrayerTimes(locationData.lat, locationData.lng, timezone);
      setPrayerTimes(times);
      setLocationInfo(locationData.address || 'Selected Location');
    } catch (error) {
      console.error('Failed to fetch prayer times:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPrayerTimes = async () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const timezone = getUserTimezone();
            const times = await fetchPrayerTimes(
              position.coords.latitude,
              position.coords.longitude,
              timezone
            );
            setPrayerTimes(times);
            setLocationInfo('Current Location');
          } catch (error) {
            console.error('Failed to fetch prayer times:', error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <aside className="w-64 h-screen sticky top-16 bg-background border-r border-border overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={location.pathname === item.path ? "spiritual" : "ghost"}
              className="w-full justify-start h-11"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Prayer Times Card */}
        <Card className="p-4 bg-gradient-peaceful border-0 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Prayer Times</h3>
            <div className="flex items-center gap-1">
              <LocationPicker onLocationSelect={handleLocationSelect} />
              {prayerTimes && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={refreshPrayerTimes}
                  disabled={isLoading}
                  className="h-8 w-8"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              )}
            </div>
          </div>
          
          {locationInfo && (
            <div className="text-xs text-muted-foreground mb-2 truncate" title={locationInfo}>
              {locationInfo}
            </div>
          )}
          
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin mx-auto mb-2" />
                <p className="text-sm">Loading prayer times...</p>
              </div>
            ) : prayerTimes ? (
              prayerTimes.map((prayer) => (
                <div 
                  key={prayer.name}
                  className={`flex justify-between items-center py-1 px-2 rounded-md ${
                    prayer.current 
                      ? 'bg-primary/10 border border-primary/20' 
                      : prayer.passed 
                      ? 'opacity-60' 
                      : ''
                  }`}
                >
                  <span className="text-sm font-medium">{prayer.name}</span>
                  <span className="text-sm text-muted-foreground">{prayer.time}</span>
                  {prayer.current && (
                    <Star className="w-3 h-3 text-accent fill-current ml-1" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select a location to view prayer times</p>
                <p className="text-xs mt-1 opacity-75">Click the location icon above</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </aside>
  );
};

export default Sidebar;