import { Heart, MessageCircle, Share2, BookmarkPlus, MoreHorizontal, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    relatedEvent?: {
      id: string;
      title: string;
      date: string;
      location: string;
    };
  };
  timestamp: string;
  likes: number;
  comments: number;
}

const PostCard = ({ author, content, timestamp, likes, comments }: PostCardProps) => {
  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'dua': return 'bg-green-100 text-green-800';
      case 'verse': return 'bg-blue-100 text-blue-800';
      case 'hadith': return 'bg-purple-100 text-purple-800';
      case 'event': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-card shadow-soft border-border hover:shadow-elevated transition-all duration-300">
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={author.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{author.name}</h3>
                {author.isVerified && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">✓</span>
                  </div>
                )}
                {content.type && content.type !== 'regular' && (
                  <Badge className={getTypeColor(content.type)}>
                    {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                  </Badge>
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
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Content */}
        {content.text && (
          <div className="mb-4">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">{content.text}</p>
          </div>
        )}

        {/* Post Image */}
        {content.image && (
          <div className="mb-4">
            <img 
              src={content.image} 
              alt="Post content" 
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Related Event */}
        {content.relatedEvent && (
          <div className="mb-4">
            <Card className="bg-muted/50 border-l-4 border-l-primary">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{content.relatedEvent.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{content.relatedEvent.date}</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{content.relatedEvent.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
              <Heart className="w-5 h-5 mr-2" />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageCircle className="w-5 h-5 mr-2" />
              {comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <BookmarkPlus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;