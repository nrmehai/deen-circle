import { Plus, Image, Calendar, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CreatePost = () => {
  const postTypes = [
    { icon: Heart, label: "Dua", type: "dua", color: "text-accent" },
    { icon: BookOpen, label: "Verse", type: "verse", color: "text-primary" },
    { icon: Calendar, label: "Event", type: "event", color: "text-destructive" },
  ];

  return (
    <Card className="bg-card shadow-soft border-border">
      <div className="p-4">
        {/* Create Post Header */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
          </Avatar>
          <Textarea 
            placeholder="Share your thoughts, dua, or community updates..."
            className="flex-1 min-h-[60px] resize-none border-0 bg-muted focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Post Type Options */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {postTypes.map((type) => (
              <Button 
                key={type.type}
                variant="ghost" 
                size="sm" 
                className={`${type.color} hover:bg-muted`}
              >
                <type.icon className="w-4 h-4 mr-2" />
                {type.label}
              </Button>
            ))}
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-muted">
              <Image className="w-4 h-4 mr-2" />
              Photo
            </Button>
          </div>
          
          <Button variant="spiritual" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;