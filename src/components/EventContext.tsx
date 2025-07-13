import React, { createContext, useContext, useState, ReactNode } from 'react';
import mosqueImg from "@/assets/mosque.jpg";
import financeImg from "@/assets/finnances.jpg";
import iftarImg from "@/assets/iftar.jpg";
import quranImg from "@/assets/quran.jpg";
import basketballImg from "@/assets/basketball.jpg";
import bakingImg from "@/assets/baking.jpg";
import hackImg from "@/assets/hack.jpg";

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  organizationLogo?: string;
  attendees: number;
  category: string;
  image?: string;
  interestedFriends: string[];
  relatedEvents: string[];
  tags?: string[];
}

const initialEvents: EventType[] = [
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
    category: "prayer",
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
    category: "education",
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
    category: "community",
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
    category: "education",
    image: quranImg,
    interestedFriends: ['Yusuf', 'Maryam'],
    relatedEvents: ['1', '2', '3'],
    tags: ['quran', 'youth', 'competition']
  },
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
    category: "community",
    image: basketballImg,
    interestedFriends: ['Ali', 'Omar'],
    relatedEvents: ['1', '2', '3'],
    tags: ["BrothersOnly", "FaithAndFitness", "BrotherhoodInMotion", "MuslimAthletes", "basketball"]
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
    category: "community",
    image: bakingImg,
    interestedFriends: ['Amina', 'Sara'],
    relatedEvents: ['1', '2', '3'],
    tags: ["SistersOnly", "Baking", "HalalSweets", "SistersWhoBake"]
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
    category: "education",
    image: hackImg,
    interestedFriends: ['Yusuf', 'Maryam'],
    relatedEvents: ['1', '2', '3'],
    tags: ["MuslimHackathon", "CodeForChange", "DeenAndDevelopment", "HackForUmmah", "YouthTechChallenge", "MyHack2025"]
  }
];

interface EventContextType {
  events: EventType[];
  addEvent: (event: EventType) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventType[]>(initialEvents);

  const addEvent = (event: EventType) => {
    setEvents(prev => [event, ...prev]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error('useEvents must be used within EventProvider');
  return ctx;
}; 