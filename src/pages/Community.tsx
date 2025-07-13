import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import EventCard from "@/components/EventCard";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommunityCard from "@/components/CommunityCard"
import { Card } from "@/components/ui/card";

const Community = () => {
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

  return (
    <div className="min-h-screen bg-gradient-peaceful">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 max-w-6xl mx-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Communities</h1>
                <p className="text-muted-foreground">Discover communities that are perfect for you!</p>
              </div>
              <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Community
              </Button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search communities..." 
                  className="pl-10 bg-card border-border"
                />
              </div>
              <Button variant="outline" className="whitespace-nowrap">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="whitespace-nowrap">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar View
              </Button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Communities.map((community, index) => (
            <CommunityCard key={index} {...community} />
            ))}

          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Communities
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Community;