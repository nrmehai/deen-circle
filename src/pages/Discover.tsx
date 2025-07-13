import { Compass, TrendingUp, Users, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useEvents } from '@/components/EventContext';

const Discover = () => {
  const { events } = useEvents();
  const trendingTopics = [
    { name: "#Ramadan2024", posts: 1234 },
    { name: "#IslamicEducation", posts: 892 },
    { name: "#CommunitySupport", posts: 567 },
    { name: "#QuranStudy", posts: 445 }
  ];

  const suggestedCommunities = [
    {
      name: "Downtown Mosque Community",
      members: 245,
      location: "Downtown",
      description: "Central mosque serving the downtown area",
      category: "Mosque"
    },
    {
      name: "Young Muslims Network",
      members: 189,
      location: "Citywide",
      description: "Professional network for young Muslims",
      category: "Professional"
    },
    {
      name: "Islamic Book Club",
      members: 156,
      location: "Online",
      description: "Monthly discussions on Islamic literature",
      category: "Education"
    }
  ];

  // Use real events for upcomingEvents
  const upcomingEvents = events.slice(0, 3); // or filter as needed

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Discover</h1>
              <p className="text-muted-foreground">Explore trending topics, communities, and events in your area</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trending Topics */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <h2 className="font-semibold text-foreground">Trending Topics</h2>
                </div>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-primary font-medium cursor-pointer hover:underline">
                        {topic.name}
                      </span>
                      <span className="text-sm text-muted-foreground">{topic.posts}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Suggested Communities */}
              <Card className="p-6 lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-accent" />
                  <h2 className="font-semibold text-foreground">Suggested Communities</h2>
                </div>
                <div className="space-y-4">
                  {suggestedCommunities.map((community, index) => (
                    <div key={index} className="flex items-start justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-foreground">{community.name}</h3>
                          <Badge variant="secondary">{community.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{community.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {community.members} members
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {community.location}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Join</Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Events */}
              <Card className="p-6 lg:col-span-3">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-accent" />
                  <h2 className="font-semibold text-foreground">Upcoming Events Today</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <h3 className="font-medium text-foreground mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>{event.time}</p>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.attendees} attending
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Discover;