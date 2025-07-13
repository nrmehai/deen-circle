import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CommunityCard from "@/components/CommunityCard";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Community = () => {
  const [communities, setCommunities] = useState([
    {
      name: "Islamic Center of Maryland",
      description: "A Masjid located in Gaithersburg Maryland",
      location: "Gaithersburg",
      attendees: 11932,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb6AofKf1cqE7Y4bl_FtQ5v1vUffdMGeQsEw&s",
      category: "masjid",
      visibility: "public"
    },
    {
      name: "UMD MSA",
      description: "Muslim Student Association at the University of Maryland!",
      location: "University of Maryland",
      attendees: 2701,
      image: "https://images.squarespace-cdn.com/content/v1/5a8b30b42278e78aeffd315f/6dbf46f1-d4cc-4650-a415-e195d5173030/logo.png",
      category: "student organization",
      visibility: "public"
    },
    {
      name: "YM Gaithersburg",
      description: "An organization located in Gaithersburg that works on building Muslim identity for the youth",
      location: "Islamic Center of Maryland",
      attendees: 78,
      image: "https://ymsite.com/wp-content/uploads/2023/07/YM-Favicon.png",
      category: "youth organization",
      visibility: "public"
    }
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    image: '',
    category: '',
    visibility: 'public'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateCommunity = () => {
    if (formData.visibility === 'public') {
      toast.info("An email will be sent to verify your group!");
    } else {
      const newCommunity = {
        ...formData,
        attendees: 1
      };
      setCommunities(prev => [...prev, newCommunity]);
    }
  
    setFormData({ name: '', description: '', location: '', image: '', category: '', visibility: 'public' });
    setOpen(false);
  };
  

  return (
    <div className="min-h-screen bg-gradient-peaceful">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Communities</h1>
                <p className="text-muted-foreground">Discover communities that are perfect for you!</p>
              </div>
              <Button
                className="bg-gradient-primary hover:bg-gradient-primary/90"
                onClick={() => setOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Community
              </Button>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search communities..." className="pl-10 bg-card border-border" />
              </div>
              <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
              <Button variant="outline"><Calendar className="w-4 h-4 mr-2" /> Calendar View</Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communities.map((community, index) => (
              <Link
                key={index}
                to={`/community/${encodeURIComponent(community.name.replace(/\s+/g, '-').toLowerCase())}`}
              >
                <CommunityCard {...community} />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">Load More Communities</Button>
          </div>
        </main>
      </div>

      {/* Create Community Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Community</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Label>Community Name</Label>
            <Input name="name" value={formData.name} onChange={handleInputChange} />

            <Label>Description</Label>
            <Input name="description" value={formData.description} onChange={handleInputChange} />

            <Label>Location</Label>
            <Input name="location" value={formData.location} onChange={handleInputChange} />

            <Label>Image URL</Label>
            <Input name="image" value={formData.image} onChange={handleInputChange} />

            <Label>Category</Label>
            <Input name="category" value={formData.category} onChange={handleInputChange} />

            <Label>Visibility</Label>
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            <Button onClick={handleCreateCommunity} className="mt-4 w-full">Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;
