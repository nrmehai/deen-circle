import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import EventCard from "@/components/EventCard";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import mosqueImg from "@/assets/mosque.jpg";
import financeImg from "@/assets/finnances.jpg";
import iftarImg from "@/assets/iftar.jpg";
import quranImg from "@/assets/quran.jpg";

const Community = () => {
  const allEvents = [
    {
      title: "Friday Jummah Prayer",
      description: "Weekly congregation prayer with khutbah by Imam Abdullah",
      date: "December 15, 2024",
      time: "1:00 PM - 2:00 PM",
      location: "Masjid Al-Noor, 123 Main St",
      organizer: "Masjid Al-Noor",
      attendees: 234,
      category: "prayer" as const,
      image: mosqueImg
    },
    {
      title: "Islamic Finance Workshop",
      description: "Learn about halal investment strategies and Islamic banking principles",
      date: "December 18, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Community Center Hall",
      organizer: "Islamic Business Association",
      attendees: 67,
      category: "education" as const,
      image: financeImg
    },
    {
      title: "Charity Drive for Refugees",
      description: "Collecting winter clothes and essential items for refugee families",
      date: "December 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Multiple locations",
      organizer: "Ummah Care Foundation",
      attendees: 156,
      category: "charity" as const,
      image: iftarImg
    },
    {
      title: "Youth Islamic Study Circle",
      description: "Weekly Quran study and discussion for young Muslims",
      date: "December 22, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Islamic Center Youth Room",
      organizer: "Youth Committee",
      attendees: 45,
      category: "education" as const,
      image: quranImg
    },
    {
      title: "Community Iftar Planning",
      description: "Planning meeting for upcoming Ramadan community iftar events",
      date: "December 25, 2024",
      time: "7:30 PM - 9:00 PM",
      location: "Masjid Conference Room",
      organizer: "Community Board",
      attendees: 23,
      category: "community" as const,
      image: iftarImg
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-peaceful">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 max-w-6xl mx-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Community Events</h1>
                <p className="text-muted-foreground">Discover and join Islamic events in your community</p>
              </div>
              <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-10 bg-card border-border"
                />
              </div>
              <Button variant="outline" className="whitespace-nowrap">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="whitespace-nowrap">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar View
              </Button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Events
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Community;