import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  category: 'prayer' | 'lecture' | 'social' | 'charity' | 'education' | 'community';
  image?: string;
}

const EventCard = ({ 
  title, 
  description, 
  date, 
  time, 
  location, 
  organizer, 
  attendees, 
  category,
  image 
}: EventCardProps) => {
  const getCategoryColor = () => {
    switch (category) {
      case 'prayer':
        return 'bg-primary text-primary-foreground';
      case 'lecture':
        return 'bg-accent text-accent-foreground';
      case 'social':
        return 'bg-secondary text-secondary-foreground';
      case 'charity':
        return 'bg-destructive text-destructive-foreground';
      case 'education':
        return 'bg-primary-glow text-primary-foreground';
      case 'community':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card shadow-soft border-border hover:shadow-elevated transition-all duration-300 overflow-hidden">
      {/* Event Image */}
      {image && (
        <div className="h-32 bg-gradient-primary overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-3">
          <Badge className={`${getCategoryColor()} capitalize`}>
            {category}
          </Badge>
        </div>

        {/* Event Title & Description */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>{attendees} attending</span>
          </div>
        </div>

        {/* Organizer & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-sm text-muted-foreground">by {organizer}</span>
          <Button variant="spiritual" size="sm">
            Attend
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;