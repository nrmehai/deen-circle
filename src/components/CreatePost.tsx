import { Plus, Image, Calendar, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useEvents } from "@/components/EventContext";
import { useProfileStore } from "@/stores/profileStore";

interface CreatePostProps {
  handleNewPost: (newPost: any) => void;
}

const CreatePost = ({ handleNewPost }: CreatePostProps) => {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [postType, setPostType] = useState<string>("regular");
  
  // Get profile data from Zustand store
  const { name, profileImage } = useProfileStore();

  const postTypes = [
    { icon: Calendar, label: "Event", type: "event", color: "text-destructive" },
    { icon: Heart, label: "Dua", type: "dua", color: "text-green-600" },
    { icon: BookOpen, label: "Verse", type: "verse", color: "text-blue-600" },
    { icon: BookOpen, label: "Hadith", type: "hadith", color: "text-purple-600" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCreatePost = () => {
    if (!postText.trim()) return;

    const selectedEventData = selectedEvent ? useEvents().events.find(event => event.id === selectedEvent) : undefined;

    const newPost = {
      author: {
        name: name, // Use name from Zustand store
        avatar: profileImage, // Use profile image from Zustand store
        isVerified: false,
        location: "Local Community"
      },
      content: {
        text: postText,
        image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
        type: postType as 'dua' | 'verse' | 'hadith' | 'event' | 'regular',
        relatedEvent: selectedEventData ? {
          id: selectedEventData.id,
          title: selectedEventData.title,
          date: selectedEventData.date,
          location: selectedEventData.location
        } : undefined
      },
      timestamp: "Just now",
      likes: 0,
      comments: 0
    };

    handleNewPost(newPost);
    
    // Reset form
    setPostText("");
    setSelectedImage(null);
    setSelectedEvent(null);
    setPostType("regular");
  };

  return (
    <Card className="bg-card shadow-soft border-border">
      <div className="p-4">
        {/* Create Post Header */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={profileImage} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Textarea 
            placeholder="Share your thoughts, dua, or community updates..."
            className="flex-1 min-h-[60px] resize-none border-0 bg-muted focus:ring-2 focus:ring-primary/20"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>

        {/* Event Selection */}
        {postType === "event" && (
          <div className="mb-4">
            <Select value={selectedEvent || ""} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an event to link" />
              </SelectTrigger>
              <SelectContent>
                {useEvents().events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title} - {event.date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-4">
            <img 
              src={URL.createObjectURL(selectedImage)} 
              alt="Selected" 
              className="max-w-full h-32 object-cover rounded-lg"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedImage(null)}
              className="mt-2 text-red-500"
            >
              Remove Image
            </Button>
          </div>
        )}

        {/* Post Type Options */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {postTypes.map((type) => (
              <Button 
                key={type.type}
                variant={postType === type.type ? "default" : "ghost"}
                size="sm" 
                className={`${type.color} hover:bg-muted`}
                onClick={() => setPostType(type.type)}
              >
                <type.icon className="w-4 h-4 mr-2" />
                {type.label}
              </Button>
            ))}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:bg-muted"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Image className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </div>
          </div>
          
          <Button 
            variant="spiritual" 
            size="sm"
            onClick={handleCreatePost}
            disabled={!postText.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;