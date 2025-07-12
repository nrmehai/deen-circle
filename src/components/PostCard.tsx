import { Heart, MessageCircle, Share2, BookmarkPlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PostCardProps {
  author: {
    name: string;
    avatar?: string;
    isVerified?: boolean;
    location?: string;
  };
  content: {
    text?: string;
    image?: string;
    type?: 'dua' | 'verse' | 'hadith' | 'event' | 'regular';
  };
  timestamp: string;
  likes: number;
  comments: number;
}

const PostCard = ({ author, content, timestamp, likes, comments }: PostCardProps) => {
  const getPostTypeStyle = () => {
    switch (content.type) {
      case 'dua':
        return 'border-l-4 border-l-accent bg-accent/5';
      case 'verse':
        return 'border-l-4 border-l-primary bg-primary/5';
      case 'hadith':
        return 'border-l-4 border-l-primary-glow bg-primary-glow/5';
      case 'event':
        return 'border-l-4 border-l-destructive bg-destructive/5';
      default:
        return '';
    }
  };

  const getPostTypeLabel = () => {
    switch (content.type) {
      case 'dua':
        return '🤲 Dua';
      case 'verse':
        return '📖 Quran Verse';
      case 'hadith':
        return '☪️ Hadith';
      case 'event':
        return '📅 Event';
      default:
        return null;
    }
  };

  return (
    <Card className="bg-card shadow-soft border-border hover:shadow-elevated transition-shadow duration-300">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={author.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-foreground">{author.name}</h4>
                {author.isVerified && (
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{timestamp}</span>
                {author.location && (
                  <>
                    <span>•</span>
                    <span>{author.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Type Label */}
      {getPostTypeLabel() && (
        <div className="px-4 pb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-muted rounded-full">
            {getPostTypeLabel()}
          </span>
        </div>
      )}

      {/* Content */}
      <div className={`px-4 pb-3 ${getPostTypeStyle()}`}>
        {content.text && (
          <p className="text-foreground leading-relaxed mb-3">{content.text}</p>
        )}
        {content.image && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={content.image} 
              alt="Post content" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
              <Heart className="w-4 h-4 mr-2" />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageCircle className="w-4 h-4 mr-2" />
              {comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
            <BookmarkPlus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;