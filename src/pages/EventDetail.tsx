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
import TagBadge from "@/components/TagBadge";
import { useEffect } from "react";
import { useEvents } from '@/components/EventContext';

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
  category: 'prayer' | 'lecture' | 'social' | 'charity' | 'education' | 'community' | 'masjid' | 'youth organization' | 'student organization';
  image?: string;
  interestedFriends: string[];
  relatedEvents: string[];
  tags?: string[];
}

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [eventId]);

  // Find the event by id from the context events array
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 flex items-center justify-center">
            <h1 className="text-2xl font-bold">Event not found</h1>
          </main>
        </div>
      </div>
    );
  }

  // Related events: filter out the current event
  const relatedEvents = events.filter(e => e.id !== event.id).slice(0, 3);

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
              <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate('/events')}>
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
                {/* Tags */}
                <div className="flex flex-wrap mb-4">
                  {Array.isArray(event.tags) && event.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
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