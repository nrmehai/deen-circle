import { useState } from "react";
import { Users } from "lucide-react";
import PostCard from "@/components/PostCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import CommunityCard from "@/components/CommunityCard"
import Sidebar from "@/components/Sidebar";
import mosqueImg from "@/assets/mosque.jpg";
import financeImg from "@/assets/finnances.jpg";
import quranImg from "@/assets/quran.jpg";
import iftarImg from "@/assets/iftar.jpg";
import TagInput from "@/components/TagInput";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "groups" | "events">("posts");
  const [tags, setTags] = useState<string[]>(["youth", "charity"]);
  const allEvents = [
    {
      id: '1',
      title: "Friday Jummah Prayer",
      description: "Weekly congregation prayer with khutbah by Imam Abdullah",
      date: "December 15, 2024",
      time: "1:00 PM - 2:00 PM",
      location: "Masjid Al-Noor, 123 Main St",
      organizer: "Masjid Al-Noor",
      attendees: 234,
      category: "prayer" as const,
      image: mosqueImg
    },
    {
      id: '2',
      title: "Islamic Finance Workshop",
      description: "Learn about halal investment strategies and Islamic banking principles",
      date: "December 18, 2024",
      time: "6:30 PM - 8:30 PM",
      location: "Community Center Hall B",
      organizer: "Islamic Finance Institute",
      attendees: 89,
      category: "education" as const,
      image: financeImg
    },
    {
      id: '3',
      title: "Community Iftar Gathering",
      description: "Join us for a blessed community iftar during Ramadan",
      date: "March 15, 2024",
      time: "6:45 PM - 8:30 PM",
      location: "Masjid Al-Noor Main Hall",
      organizer: "Community Volunteers",
      attendees: 156,
      category: "community" as const,
      image: iftarImg
    },
    {
      id: '4',
      title: "Youth Quran Competition",
      description: "Annual Quran recitation and memorization competition for youth",
      date: "January 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Islamic Education Center",
      organizer: "Youth Islamic Society",
      attendees: 45,
      category: "education" as const,
      image: quranImg
    }
  ];

  const Communities = [
    {
      name: "Islamic Center of Maryland",
      description: "A Masjid located in Gaithersburg Maryland",
      location: "Gaithersburg",
      attendees: 11932,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb6AofKf1cqE7Y4bl_FtQ5v1vUffdMGeQsEw&s",
      category: "masjid" as const
    },
    {
      name: "UMD MSA",
      description: "Muslim Student Assocciation at the University of Maryland!",
      location: "University of Maryland",
      attendees: 2701,
      image: "https://images.squarespace-cdn.com/content/v1/5a8b30b42278e78aeffd315f/6dbf46f1-d4cc-4650-a415-e195d5173030/logo.png",
      category: "student organization" as const
    },
    {
      name: "YM Gaithersburg",
      description: "An organization located in Gaithersburg that works on building Muslim identity for the youth",
      location: "Islamic Center of Maryland",
      attendees: 78,
      image: "https://ymsite.com/wp-content/uploads/2023/07/YM-Favicon.png",
      category: "youth organization" as const
    }
  ];

  const samplePosts = [
    {
      author: {
        name: "Yahya Abdullah",
        location: "Islamic Center of Maryland"
      },
      content: {
        text: "Attending my first Hackathon at the Islamic Center of Maryland!",
        type: "event" as const
      },
      timestamp: "1 day ago",
      likes: 142,
      comments: 28
    },
    {
      author: {
        name: "Yahya Abdullah"
      },
      content: {
        text: "Does anyone know of any halal spots near Germantown-Rockville area?",
      },
      timestamp: "1 week ago",
      likes: 89,
      comments: 15
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg" alt="Profile" className="w-32 h-32 rounded-full object-cover border"/>

              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold">Yahya Abdullah</h1>
                <p className="text-muted-foreground">
                    Free Palestine
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Friends: <strong>42</strong></span>
                  <span>Groups: <strong>3</strong></span>
                </div>
                {/* Tag Management */}
                <div className="mt-2">
                  <span className="block text-sm font-medium mb-1">My Interests/Tags:</span>
                  <TagInput value={tags} onChange={setTags} suggestions={["youth", "charity", "education", "prayer", "iftar", "finance", "community", "quran", "competition", "workshop", "ramadan"]} />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border flex gap-4">
              <Button
                variant={activeTab === "posts" ? "default" : "ghost"}
                onClick={() => setActiveTab("posts")}
              >
                My Posts
              </Button>
              <Button
                variant={activeTab === "groups" ? "default" : "ghost"}
                onClick={() => setActiveTab("groups")}
              >
                My Communities
              </Button>

              <Button
                variant={activeTab === "events" ? "default" : "ghost"}
                onClick={() => setActiveTab("events")}
              >
                My Events
              </Button>
            </div>

            {/* Tab Content */}
            <div className="h-96 overflow-y-auto space-y-4">
              {activeTab === "posts" && (
                <>
                  {samplePosts.map((post, index) => (
                  <PostCard key={index} {...post} />
                ))}
                </>
              )}
              {activeTab === "groups" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Communities.map((community, index) => (
                    <CommunityCard key={index} {...community} />
                    ))}
                    </div>
                  )}

              {activeTab === "events" && (
  <div className="grid md:grid-cols-2 gap-4">
    {allEvents
      .filter(event =>
        ["Islamic Finance Workshop", "Youth Quran Competition"].includes(event.title)
      )
      .map(event => (
        <EventCard key={event.id} {...event} />
      ))}
  </div>
)}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
