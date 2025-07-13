import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import GoogleCalendar from "@/components/GoogleCalendar";
import { useProfileStore } from '@/stores/profileStore';
import { useEvents } from '@/components/EventContext';
import iftarImg from "@/assets/iftar.jpg";
import quranImg from "@/assets/quran.jpg";
import financeImg from "@/assets/finnances.jpg";
import hackImg from "@/assets/hack.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { name, profileImage } = useProfileStore();
  const { events } = useEvents();
  
  // Sample friends stories data
  const friendsStories = [
    { id: 1, name: "Amina", profilePicture: "https://torange.biz/photofxnew/21/HD/image-profile-picture-flower-trade-21151.webp", event: { title: "Islamic Finance Workshop", image: financeImg }},
    { id: 2, name: "Omar", profilePicture: "https://media.istockphoto.com/id/1458836233/photo/side-view-of-bearded-arab-businessman-looking-into-distance-on-pavement.jpg?s=612x612&w=0&k=20&c=74568GQrPgqWT0V5nRlmX6cHJgVhe9JLd-qOPcgT7ck=", event: { title: "Youth Quran Competition", image: quranImg }},
    { id: 3, name: "Fatima", profilePicture: "https://i.pinimg.com/736x/5a/b1/18/5ab118f3146c4c6f0e6428c71f5cf2df.jpg", event: { title: "Charity Drive for Refugees", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop" }},
    { id: 4, name: "Ahmed", profilePicture: "https://www.neon-entertainment.com/wp-content/uploads/2022/12/Website-Page-Images-3.jpg", event: { title: "Community Iftar Gathering", image: iftarImg }},
    { id: 5, name: "Yusuf", profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face", event: { title: "My Hack", image: hackImg }}
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
      eventId = '4';}
    navigate(`/events/${(eventId)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-peaceful">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 px-4 py-4 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Your Circle</h2>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4 min-w-max">
                {friendsStories.map((friend) => (
                  <div key={friend.id} onClick={() => handleFriendStoryClick(friend.event.title)} className="flex-shrink-0 w-80 lg:w-96 cursor-pointer">
                    <div className="flex items-center gap-6 p-4 lg:p-6 bg-card rounded-2xl shadow-elevated hover:shadow-lg border border-border/50 h-full">
                      <div className="flex-shrink-0">
                        <img src={friend.profilePicture} alt={friend.name} className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl lg:text-2xl font-bold mb-2">{friend.name}</h3>
                        <div className="flex items-center gap-4">
                          <img src={friend.event.image} alt={friend.event.title} className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl object-cover" />
                          <div>
                            <p className="text-base lg:text-lg font-semibold">{friend.event.title}</p>
                            <p className="text-sm text-muted-foreground">Attending this event</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
        </main>
      </div>
    </div>
  );
};

export default Index;
