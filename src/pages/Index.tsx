import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import EventCard from "@/components/EventCard";
import GoogleCalendar from "@/components/GoogleCalendar";
import { Calendar, Compass, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfileStore } from '@/stores/profileStore';

const Index = () => {
  const { name, profileImage } = useProfileStore();
  
  // Sample friends stories data
  const friendsStories = [
    {
      id: 1,
      name: "Amina",
      profilePicture: "https://torange.biz/photofxnew/21/HD/image-profile-picture-flower-trade-21151.webp",
      event: {
        title: "Finance Workshop",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150&h=150&fit=crop"
      }
    },
    {
      id: 2,
      name: "Omar",
      profilePicture: "https://media.istockphoto.com/id/1458836233/photo/side-view-of-bearded-arab-businessman-looking-into-distance-on-pavement.jpg?s=612x612&w=0&k=20&c=74568GQrPgqWT0V5nRlmX6cHJgVhe9JLd-qOPcgT7ck=",
      event: {
        title: "Quran Study Circle",
        image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=150&h=150&fit=crop"
      }
    },
    {
      id: 3,
      name: "Fatima",
      profilePicture: "https://i.pinimg.com/736x/5a/b1/18/5ab118f3146c4c6f0e6428c71f5cf2df.jpg",
      event: {
        title: "Charity Drive",
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop"
      }
    },
    {
      id: 4,
      name: "Ahmed",
      profilePicture: "https://www.neon-entertainment.com/wp-content/uploads/2022/12/Website-Page-Images-3.jpg",
      event: {
        title: "Iftar Gathering",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop"
      }
    },
    {
      id: 5,
      name: "Hassan",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      event: {
        title: "Youth Meetup",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150&h=150&fit=crop"
      }
    },
    {
      id: 6,
      name: "Layla",
      profilePicture: "https://img.freepik.com/premium-vector/vector-beautiful-muslim-girl-sitting-moon-cartoon-icon-vector-illustration-religious-icon_844724-2731.jpg?w=360",
      event: {
        title: "Community Dinner",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150&h=150&fit=crop"
      }
    },
    {
      id: 7,
      name: "Yusuf",
      profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
      event: {
        title: "Islamic Art Class",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=150&h=150&fit=crop"
      }
    }
  ];

  // Sample data for demonstration - now using state
  const initialPosts = [
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

  const [samplePosts, setSamplePosts] = useState(initialPosts);

  const handleNewPost = (newPost: any) => {
    setSamplePosts(prev => [newPost, ...prev]);
  };

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
        {/* Sidebar - Fixed width */}
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Main Content - Takes remaining space */}
        <main className="flex-1 min-w-0 px-4 py-4 lg:px-8">
          {/* Friends Stories Section - Horizontal Scroll */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Circle</h2>
            
            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4 min-w-max">
                {friendsStories.map((friend) => (
                  <div key={friend.id} className="flex-shrink-0 w-80 lg:w-96">
                    <div className="flex items-center gap-6 p-4 lg:p-6 bg-card rounded-2xl shadow-elevated hover:shadow-lg transition-all duration-300 cursor-pointer border border-border/50 h-full">
                      {/* Large Profile Picture */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
                          <img 
                            src={friend.profilePicture} 
                            alt={friend.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Event Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 lg:mb-3">{friend.name}</h3>
                        <div className="flex items-center gap-4">
                          {/* Event Image */}
                          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                            <img 
                              src={friend.event.image} 
                              alt={friend.event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Event Title */}
                          <div className="min-w-0">
                            <p className="text-base lg:text-lg font-semibold text-foreground mb-1">{friend.event.title}</p>
                            <p className="text-sm text-muted-foreground">Attending this event</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scroll Hint */}
            <div className="text-center mt-2">
              <p className="text-sm text-muted-foreground">← Scroll to see more friends →</p>
            </div>
          </div>

          {/* Create Post */}
          <div className="mb-6">
            <CreatePost handleNewPost={handleNewPost} />
          </div>

          {/* Main Feed - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Posts Feed - Takes more space */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Community Feed</h2>
              </div>
              
              {samplePosts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </div>

            {/* Right Sidebar Content */}
            <div className="lg:col-span-1 space-y-6">
              {/* Google Calendar */}
              <GoogleCalendar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
