import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import EventCard from "@/components/EventCard";
import heroImage from "@/assets/hero-islamic.jpg";
import { Calendar, Compass, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Sample data for demonstration
  const samplePosts = [
    {
      author: {
        name: "Dr. Ahmad Hassan",
        isVerified: true,
        location: "Masjid Al-Noor"
      },
      content: {
        text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ\n\n'Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire.' - A beautiful dua to recite daily.",
      },
      timestamp: "2 hours ago",
      likes: 142,
      comments: 28
    },
    {
      author: {
        name: "Fatima Al-Zahra Community Center",
        isVerified: true,
        location: "Downtown"
      },
      content: {
        text: "Join us this Friday for our weekly Quran study circle. We'll be discussing Surah Al-Kahf and its lessons for modern Muslims. Light refreshments will be served. All levels welcome!",
        type: "event" as const
      },
      timestamp: "4 hours ago",
      likes: 89,
      comments: 15
    },
    {
      author: {
        name: "Sister Aisha",
        location: "Local Community"
      },
      content: {
        text: "Alhamdulillah for another beautiful day. Sharing some photos from today's family picnic at the park. It's so important to spend quality time with our loved ones and appreciate Allah's creation. 🌳🌸",
        type: "regular" as const
      },
      timestamp: "6 hours ago",
      likes: 67,
      comments: 12
    }
  ];

  const upcomingEvents = [
    {
      title: "Friday Jummah Prayer",
      description: "Weekly congregation prayer with khutbah by Imam Abdullah",
      date: "December 15, 2024",
      time: "1:00 PM - 2:00 PM",
      location: "Masjid Al-Noor, 123 Main St",
      organizer: "Masjid Al-Noor",
      attendees: 234,
      category: "prayer" as const
    },
    {
      title: "Islamic Finance Workshop",
      description: "Learn about halal investment strategies and Islamic banking principles",
      date: "December 18, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Community Center Hall",
      organizer: "Islamic Business Association",
      attendees: 67,
      category: "education" as const
    },
    {
      title: "Charity Drive for Refugees",
      description: "Collecting winter clothes and essential items for refugee families",
      date: "December 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Multiple locations",
      organizer: "Ummah Care Foundation",
      attendees: 156,
      category: "charity" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-peaceful">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto p-6">
          {/* Hero Section */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-elevated">
            <div 
              className="h-64 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${heroImage})` }}
            >
              <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <h1 className="text-4xl font-bold mb-2">Assalamu Alaikum</h1>
                  <p className="text-xl opacity-90">Welcome to your Islamic community hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Post */}
          <div className="mb-6">
            <CreatePost />
          </div>

          {/* Main Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Posts Feed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Community Feed</h2>
                <Button variant="ghost" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </Button>
              </div>
              
              {samplePosts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <Card className="p-4 bg-card shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Upcoming Events
                  </h3>
                  <Button variant="ghost" size="sm">
                    <Compass className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 2).map((event, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{event.date}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
                        <Button variant="spiritual" size="sm" className="text-xs px-2 py-1 h-6">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Featured Events */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Featured Events</h3>
                {upcomingEvents.slice(0, 2).map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
