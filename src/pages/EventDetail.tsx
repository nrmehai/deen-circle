import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Share2, ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import EventCard from '@/components/EventCard';
import heroImage from '@/assets/hero-islamic.jpg';
import mosqueImg from '@/assets/mosque.jpg';
import financeImg from '@/assets/finnances.jpg';
import iftarImg from '@/assets/iftar.jpg';
import quranImg from '@/assets/quran.jpg';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  organizationLogo?: string;
  attendees: number;
  category: 'prayer' | 'lecture' | 'social' | 'charity' | 'education' | 'community';
  image?: string;
  interestedFriends: string[];
  relatedEvents: string[];
}

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Mock event data - In a real app, this would come from an API
  const event: Event = {
    id: '1',
    title: 'Friday Jummah Prayer',
    description: 'Weekly congregation prayer with khutbah by Imam Abdullah. Join us for this blessed gathering where we will discuss the importance of community and brotherhood in Islam.',
    date: 'December 15, 2024',
    time: '1:00 PM - 2:00 PM',
    location: 'Masjid Al-Noor, 123 Main St',
    organizer: 'Masjid Al-Noor',
    organizationLogo: '/placeholder.svg',
    attendees: 234,
    category: 'prayer',
    image: mosqueImg, // imported mosque image
    interestedFriends: ['Ahmed', 'Fatima', 'Omar'],
    relatedEvents: ['2', '3', '4']
  };

  // Mock related events data
  const relatedEvents = [
    {
      id: '2',
      title: 'Islamic Finance Workshop',
      description: 'Learn about halal investment strategies',
      date: 'December 18, 2024',
      time: '7:00 PM - 9:00 PM',
      location: 'Community Center Hall',
      organizer: 'Islamic Business Association',
      attendees: 120,
      category: 'education',
      image: financeImg, // imported finance image
    },
    {
      id: '3',
      title: 'Community Iftar Gathering',
      description: 'Join us for a blessed community iftar during Ramadan',
      date: 'March 15, 2024',
      time: '6:45 PM - 8:30 PM',
      location: 'Masjid Al-Noor Main Hall',
      organizer: 'Community Volunteers',
      attendees: 156,
      category: 'community',
      image: iftarImg, // imported iftar image
    },
    {
      id: '4',
      title: 'Youth Quran Competition',
      description: 'Annual Quran recitation and memorization competition for youth',
      date: 'January 20, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Islamic Education Center',
      organizer: 'Youth Islamic Society',
      attendees: 45,
      category: 'education',
      image: quranImg, // imported Quran image
    }
  ];

  const getCategoryColor = (category: Event['category']) => {
    const colors = {
      prayer: 'bg-primary text-primary-foreground',
      lecture: 'bg-accent text-accent-foreground',
      social: 'bg-secondary text-secondary-foreground',
      charity: 'bg-destructive text-destructive-foreground',
      education: 'bg-primary-glow text-primary-foreground',
      community: 'bg-accent text-accent-foreground'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Button variant="ghost" className="flex items-center gap-2" onClick={() => window.history.back()}>
                <ChevronLeft className="h-4 w-4" />
                Back to Events
              </Button>
            </div>

            {/* Event Hero Section */}
            <Card className="mb-6 overflow-hidden">
              <div className="relative h-64 bg-muted">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <Badge className={`mb-2 ${getCategoryColor(event.category)}`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                <p className="text-muted-foreground mb-6">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>{event.attendees} interested</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">Interested</Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Organization Section */}
            <Card className="mb-6 p-6">
              <h2 className="text-xl font-semibold mb-4">Organized by</h2>
              <div className="flex items-center gap-4">
                <img
                  src={event.organizationLogo}
                  alt={event.organizer}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{event.organizer}</h3>
                  <p className="text-sm text-muted-foreground">Islamic Organization</p>
                </div>
              </div>
            </Card>

            {/* Friends Interested Section */}
            <Card className="mb-6 p-6">
              <h2 className="text-xl font-semibold mb-4">Friends Interested</h2>
              <div className="flex items-center gap-2">
                {event.interestedFriends.map((friend, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium"
                  >
                    {friend[0]}
                  </div>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {event.interestedFriends.length} friends are interested
                </span>
              </div>
            </Card>

            {/* Related Events Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Similar Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map((relatedEvent) => (
                  <div key={relatedEvent.id} onClick={() => navigate(`/events/${relatedEvent.id}`)} style={{ cursor: 'pointer' }}>
                    <EventCard
                      {...relatedEvent}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDetail;