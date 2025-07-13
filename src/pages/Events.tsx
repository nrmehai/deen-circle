import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import EventCard from "@/components/EventCard";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-islamic.jpg";
import mosqueImg from "@/assets/mosque.jpg";
import financeImg from "@/assets/finnances.jpg";
import iftarImg from "@/assets/iftar.jpg";
import quranImg from "@/assets/quran.jpg";

export const allEvents = [
  {
    id: '1',
    title: "Friday Jummah Prayer",
    description: "Weekly congregation prayer with khutbah by Imam Abdullah",
    date: "December 15, 2024",
    time: "1:00 PM - 2:00 PM",
    location: "Masjid Al-Noor, 123 Main St",
    organizer: "Masjid Al-Noor",
    organizationLogo: '/placeholder.svg',
    attendees: 234,
    category: "prayer" as const,
    image: mosqueImg,
    interestedFriends: ['Ahmed', 'Fatima', 'Omar'],
    relatedEvents: ['2', '3', '4']
  },
  {
    id: '2',
    title: "Islamic Finance Workshop",
    description: "Learn about halal investment strategies and Islamic banking principles",
    date: "December 18, 2024",
    time: "6:30 PM - 8:30 PM",
    location: "Community Center Hall B",
    organizer: "Islamic Finance Institute",
    organizationLogo: '/placeholder.svg',
    attendees: 89,
    category: "education" as const,
    image: financeImg,
    interestedFriends: ['Layla', 'Bilal'],
    relatedEvents: ['1', '3', '4']
  },
  {
    id: '3',
    title: "Community Iftar Gathering",
    description: "Join us for a blessed community iftar during Ramadan",
    date: "March 15, 2024",
    time: "6:45 PM - 8:30 PM",
    location: "Masjid Al-Noor Main Hall",
    organizer: "Community Volunteers",
    organizationLogo: '/placeholder.svg',
    attendees: 156,
    category: "community" as const,
    image: iftarImg,
    interestedFriends: ['Samir', 'Aisha'],
    relatedEvents: ['1', '2', '4']
  },
  {
    id: '4',
    title: "Youth Quran Competition",
    description: "Annual Quran recitation and memorization competition for youth",
    date: "January 20, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Islamic Education Center",
    organizer: "Youth Islamic Society",
    organizationLogo: '/placeholder.svg',
    attendees: 45,
    category: "education" as const,
    image: quranImg,
    interestedFriends: ['Yusuf', 'Maryam'],
    relatedEvents: ['1', '2', '3']
  }
];

const Events = () => {
  return (
    <div className="min-h-screen bg-gradient-peaceful">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Events</h1>
                <p className="text-muted-foreground">Discover and join Islamic events in your community</p>
              </div>
              <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
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

export default Events;