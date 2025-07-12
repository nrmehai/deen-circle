import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import EventCard from "@/components/EventCard";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Events = () => {
  const allEvents = [
    {
      id: '1',
      title: "Friday Jummah Prayer",
      description: "Weekly congregation prayer with khutbah by Imam Abdullah",
      date: "December 15, 2024",
      time: "1:00 PM - 2:00 PM",
      location: "Masjid Al-Noor, 123 Main St",
      organizer: "Masjid Al-Noor",
      attendees: 234,
      category: "prayer" as const,
      image: "/prayer-mat.svg"
    },
    {
      id: '2',
      title: "Islamic Finance Workshop",
      description: "Learn about halal investment strategies and Islamic banking principles",
      date: "December 18, 2024",
      time: "6:30 PM - 8:30 PM",
      location: "Community Center Hall B",
      organizer: "Islamic Finance Institute",
      attendees: 89,
      category: "education" as const,
      image: "/finance-workshop.svg"
    },
    {
      id: '3',
      title: "Community Iftar Gathering",
      description: "Join us for a blessed community iftar during Ramadan",
      date: "March 15, 2024",
      time: "6:45 PM - 8:30 PM",
      location: "Masjid Al-Noor Main Hall",
      organizer: "Community Volunteers",
      attendees: 156,
      category: "community" as const,
      image: "/iftar-gathering.svg"
    },
    {
      id: '4',
      title: "Youth Quran Competition",
      description: "Annual Quran recitation and memorization competition for youth",
      date: "January 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Islamic Education Center",
      organizer: "Youth Islamic Society",
      attendees: 45,
      category: "education" as const,
      image: "/quran-competition.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container grid lg:grid-cols-[240px_1fr] gap-4 pt-4">
        <Sidebar />
        <main className="flex flex-col gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <Input
                placeholder="Search events..."
                className="max-w-sm"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
              <div className="ml-auto">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Events;