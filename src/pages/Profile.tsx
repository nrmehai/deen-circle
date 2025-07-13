import { useState } from "react";
import { Users, Camera, Edit2, Check, X } from "lucide-react";
import PostCard from "@/components/PostCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import CommunityCard from "@/components/CommunityCard"
import Sidebar from "@/components/Sidebar";
import mosqueImg from "@/assets/mosque.jpg";
import financeImg from "@/assets/finnances.jpg";
import quranImg from "@/assets/quran.jpg";
import iftarImg from "@/assets/iftar.jpg";
import TagInput from "@/components/TagInput";
import { Link } from 'react-router-dom';
import { useProfileStore } from '@/stores/profileStore';
import { useEvents } from '@/components/EventContext';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "groups" | "events">("posts");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  
  // Get state and actions from Zustand store
  const { name, bio, profileImage, tags, setName, setBio, setProfileImage, setTags } = useProfileStore();
  
  // Local editing states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempBio, setTempBio] = useState(bio);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setProfileImage(result);
          setIsUploadDialogOpen(false);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  const handleNameEdit = () => {
    setTempName(name);
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setName(tempName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(name);
    setIsEditingName(false);
  };

  const handleBioEdit = () => {
    setTempBio(bio);
    setIsEditingBio(true);
  };

  const handleBioSave = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  const handleBioCancel = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent, saveFunction: () => void) => {
    if (e.key === 'Enter') {
      saveFunction();
    } else if (e.key === 'Escape') {
      if (saveFunction === handleNameSave) {
        handleNameCancel();
      } else {
        handleBioCancel();
      }
    }
  };

  const { events } = useEvents();

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

  // Single samplePosts declaration that uses the dynamic name and profileImage from store
  const samplePosts = [
    {
      author: {
        name: name,
        avatar: profileImage, // Add dynamic profile image
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
        name: name,
        avatar: profileImage // Add dynamic profile image
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
              <div className="relative group">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border cursor-pointer transition-opacity group-hover:opacity-75"
                />
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload Profile Picture</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Choose a new profile picture. Supported formats: JPG, PNG, GIF
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsUploadDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex-1 space-y-2">
                {/* Editable Name */}
                <div className="flex items-center gap-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, handleNameSave)}
                        className="text-2xl font-bold h-auto p-1 border-0 border-b-2 rounded-none focus:ring-0"
                        autoFocus
                      />
                      <Button size="sm" variant="ghost" onClick={handleNameSave}>
                        <Check className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleNameCancel}>
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group">
                      <h1 className="text-2xl font-bold">{name}</h1>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={handleNameEdit}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Editable Bio */}
                <div className="flex items-center gap-2">
                  {isEditingBio ? (
                    <div className="flex items-center gap-2 w-full">
                      <Input
                        value={tempBio}
                        onChange={(e) => setTempBio(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, handleBioSave)}
                        className="text-muted-foreground h-auto p-1 border-0 border-b-2 rounded-none focus:ring-0"
                        autoFocus
                      />
                      <Button size="sm" variant="ghost" onClick={handleBioSave}>
                        <Check className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleBioCancel}>
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group">
                      <p className="text-muted-foreground">{bio}</p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={handleBioEdit}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

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
                    <Link key={index} to={`/community/${encodeURIComponent(community.name.replace(/\s+/g, '-').toLowerCase())}`}>
                      <CommunityCard {...community} />
                      </Link>
                    ))}
                    </div>
                  )}


              {activeTab === "events" && (
  <div className="grid md:grid-cols-2 gap-4">
    {events
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
