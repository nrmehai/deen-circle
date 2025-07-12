import { Moon, User, Bell, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationPicker } from "./LocationPicker";
import * as React from "react";

const Header = () => {
  const [locationInfo, setLocationInfo] = React.useState<string>('');

  const handleLocationSelect = (location: { lat: number; lng: number; radius: number; address: string }) => {
    setLocationInfo(`Showing results from ${location.radius} miles from ${location.address}`);
  };

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
              <h1 className="text-xl font-bold text-foreground">Ummah</h1>
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
            <div className="flex items-center space-x-2">
              <LocationPicker onLocationSelect={handleLocationSelect} />
              <Button variant="ghost" size="icon">
                <Calendar className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>


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
    </header>
  );
};

export default Header;