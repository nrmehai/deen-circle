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
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { icon: Home, label: "Feed", path: "/" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: BookOpen, label: "Learning", path: "/learning" },
    { icon: Heart, label: "Donation", path: "/charity" },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
  ];

  const prayerTimes = [
    { name: "Fajr", time: "5:30 AM", passed: true },
    { name: "Dhuhr", time: "12:45 PM", passed: true },
    { name: "Asr", time: "3:30 PM", current: true },
    { name: "Maghrib", time: "6:15 PM", passed: false },
    { name: "Isha", time: "7:45 PM", passed: false },
  ];

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
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            {prayerTimes.map((prayer) => (
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
            ))}
          </div>
        </Card>

        {/* Quick Settings */}
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;