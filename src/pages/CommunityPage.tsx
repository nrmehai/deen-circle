import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, ChevronLeft, Share2, Calendar, Clock } from 'lucide-react';
import { useEvents } from '@/components/EventContext';

const Communities = [
  {
    name: "Islamic Center of Maryland",
    slug: "islamic-center-of-maryland",
    description: "A Masjid located in Gaithersburg Maryland.",
    location: "Gaithersburg",
    attendees: 11932,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb6AofKf1cqE7Y4bl_FtQ5v1vUffdMGeQsEw&s",
    category: "Masjid"
  },
  {
    name: "UMD MSA",
    slug: "umd-msa",
    description: "Muslim Student Association at the University of Maryland!",
    location: "University of Maryland",
    attendees: 2701,
    image: "https://images.squarespace-cdn.com/content/v1/5a8b30b42278e78aeffd315f/6dbf46f1-d4cc-4650-a415-e195d5173030/logo.png",
    category: "Student Organization"
  },
  {
    name: "YM Gaithersburg",
    slug: "ym-gaithersburg",
    description: "An organization located in Gaithersburg that builds Muslim identity for youth.",
    location: "Islamic Center of Maryland",
    attendees: 78,
    image: "https://ymsite.com/wp-content/uploads/2023/07/YM-Favicon.png",
    category: "Youth Organization"
  }
];

const CommunityPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();

  const community = Communities.find(c => c.slug === slug);
  var communityEvents
  if (!community) {
    communityEvents = events.filter(e => e.communitySlug === 'untitled'); // Fallback to a default event if community not found
  }
  else{
      communityEvents = events.filter(e => e.communitySlug === community.slug);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="container mx-auto space-y-6">

            <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4" />
              Back to Communities
            </Button>

            <Card className="overflow-hidden">
              <img src={community.image} alt={community.name} className="w-full h-64 object-cover"/>
              <div className="p-6 space-y-4">
                <Badge>{community.category}</Badge>
                <h1 className="text-3xl font-bold">{community.name}</h1>
                <p className="text-muted-foreground">{community.description}</p>

                <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary"/>
                    {community.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary"/>
                    {community.attendees} members
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">Join Community</Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4"/> Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
              {communityEvents.length > 0 ? (
                <div className="space-y-4">
                  {communityEvents.map(event => (
                    <Card key={event.id} className="p-4">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-muted-foreground mt-2">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> {event.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" /> {event.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {event.location}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No upcoming events for this community.</p>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
