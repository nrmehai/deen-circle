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
import TagBadge from "@/components/TagBadge";
import { useState } from "react";
import basketballImg from "@/assets/basketball.jpg";
import bakingImg from "@/assets/baking.jpg";
import hackImg from "@/assets/hack.jpg";

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
    relatedEvents: ['2', '3', '4'],
    tags: ['prayer', 'community', 'weekly']
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
    relatedEvents: ['1', '3', '4'],
    tags: ['finance', 'education', 'workshop']
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
    relatedEvents: ['1', '2', '4'],
    tags: ['iftar', 'ramadan', 'community']
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
    relatedEvents: ['1', '2', '3'],
    tags: ['quran', 'youth', 'competition']
  },
  // New events
  {
    id: '5',
    title: "Brother's Basketball Session",
    description: "Weekly basketball session for brothers to bond and stay fit.",
    date: "February 10, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Community Sports Hall",
    organizer: "Brotherhood Sports",
    organizationLogo: '/placeholder.svg',
    attendees: 30,
    category: "community" as const,
    image: basketballImg,
    interestedFriends: ['Ali', 'Omar'],
    relatedEvents: ['1', '2', '3'],
    tags: [
      "BrothersOnly",
      "FaithAndFitness",
      "BrotherhoodInMotion",
      "MuslimAthletes",
      "basketball"
    ]
  },
  {
    id: '6',
    title: "Sister's Baking Class",
    description: "A fun halal baking class for sisters to learn and connect.",
    date: "February 15, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Community Kitchen",
    organizer: "Sisters Circle",
    organizationLogo: '/placeholder.svg',
    attendees: 18,
    category: "community" as const,
    image: bakingImg,
    interestedFriends: ['Amina', 'Sara'],
    relatedEvents: ['1', '2', '3'],
    tags: [
      "SistersOnly",
      "Baking",
      "HalalSweets",
      "SistersWhoBake"
    ]
  },
  {
    id: '7',
    title: "My Hack",
    description: "Muslim hackathon for youth to code for change and the Ummah.",
    date: "March 1, 2025",
    time: "9:00 AM - 9:00 PM",
    location: "Tech Innovation Center",
    organizer: "Youth Tech",
    organizationLogo: '/placeholder.svg',
    attendees: 60,
    category: "education" as const,
    image: hackImg,
    interestedFriends: ['Yusuf', 'Maryam'],
    relatedEvents: ['1', '2', '3'],
    tags: [
      "MuslimHackathon",
      "CodeForChange",
      "DeenAndDevelopment",
      "HackForUmmah",
      "YouthTechChallenge",
      "MyHack2025"
    ]
  }
];

const Events = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  // Extract all unique tags from allEvents
  const allTags = Array.from(new Set(allEvents.flatMap(e => e.tags || [])));
  // Filter events by selected tags
  const filteredEvents = !selectedTag
    ? allEvents
    : allEvents.filter(event => event.tags?.includes(selectedTag));

  const toggleTag = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

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
          {/* Tag Filter UI */}
          <div className="mb-4 mt-1 overflow-x-auto hide-scrollbar">
            <div className="flex flex-nowrap gap-2 min-w-max">
              {allTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="focus:outline-none"
                >
                  <TagBadge tag={tag} selected={selectedTag === tag} />
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
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
      <style>{`
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`}</style>
    </div>
  );
};

export default Events;