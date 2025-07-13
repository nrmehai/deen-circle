import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import GoogleCalendar from "@/components/GoogleCalendar";
import { useProfileStore } from '@/stores/profileStore';
import { useEvents } from '@/components/EventContext';

const Index = () => {
  const navigate = useNavigate();
  const { name, profileImage } = useProfileStore();
  const { events } = useEvents();
  
  // Sample friends stories data
  const friendsStories = [
    { id: 1, name: "Amina", profilePicture: "https://torange.biz/photofxnew/21/HD/image-profile-picture-flower-trade-21151.webp", event: { title: "Islamic Finance Workshop", image: events[1]?.image || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop" }},
    { id: 2, name: "Omar", profilePicture: "https://media.istockphoto.com/id/1458836233/photo/side-view-of-bearded-arab-businessman-looking-into-distance-on-pavement.jpg?s=612x612&w=0&k=20&c=74568GQrPgqWT0V5nRlmX6cHJgVhe9JLd-qOPcgT7ck=", event: { title: "Youth Quran Competition", image: events[3]?.image || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop" }},
    { id: 3, name: "Fatima", profilePicture: "https://i.pinimg.com/736x/5a/b1/18/5ab118f3146c4c6f0e6428c71f5cf2df.jpg", event: { title: "Charity Drive for Refugees", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop" }},
    { id: 4, name: "Ahmed", profilePicture: "https://www.neon-entertainment.com/wp-content/uploads/2022/12/Website-Page-Images-3.jpg", event: { title: "Community Iftar Gathering", image: events[2]?.image || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop" }},
    { id: 5, name: "Yusuf", profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face", event: { title: "My Hack", image: events[6]?.image || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop" }}
  ];

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

  const handleNewPost = (newPost: any) => setSamplePosts(prev => [newPost, ...prev]);

  // Use real events for upcomingEvents
  const upcomingEvents = events.slice(0, 3); // or filter as needed

  const handleFriendStoryClick = (eventTitle: string) => {
    let eventId = '';
    if (eventTitle === 'Islamic Finance Workshop') {
      eventId = '2';
    } else if (eventTitle === 'Youth Quran Competition') {
      eventId = '4';
    } else if (eventTitle === 'Community Iftar Gathering') {
      eventId = '3';
    } else if (eventTitle === 'My Hack') {
      eventId = '7';
    }
    if (eventId) {
      navigate(`/events/${eventId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {name || 'Guest'}!</h1>
              <p className="text-muted-foreground">Check out the latest events and posts in your community.</p>
            </div>
            {/* Friends Stories */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Friends' Stories</h2>
              <div className="flex gap-4 overflow-x-auto">
                {friendsStories.map(story => (
                  <div 
                    key={story.id} 
                    className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleFriendStoryClick(story.event.title)}
                  >
                    <img src={story.profilePicture} alt={story.name} className="w-16 h-16 rounded-full object-cover mb-2" />
                    <span className="text-sm font-medium">{story.name}</span>
                    <span className="text-xs text-muted-foreground">{story.event.title}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Upcoming Events */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="col-span-1">
                    {/* You can use EventCard or a custom card here */}
                    <div className="bg-card rounded-lg shadow p-4">
                      <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded mb-2" />
                      <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{event.date} at {event.time}</p>
                      <button className="text-primary underline" onClick={() => navigate(`/events/${event.id}`)}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <CreatePost handleNewPost={handleNewPost} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
              <div className="lg:col-span-3 space-y-6">
                <h2 className="text-2xl font-bold">Community Feed</h2>
                {samplePosts.map((post, index) => <PostCard key={index} {...post} />)}
              </div>
              <div className="lg:col-span-1">
                <GoogleCalendar />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
