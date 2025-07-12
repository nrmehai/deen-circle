import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  id?: string;
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
  id = '1',
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
  const navigate = useNavigate();

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

  const handleCardClick = () => {
    navigate(`/events/${id}`);
  };

  const handleInterestClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    navigate(`/events/${id}`);
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg" 
      onClick={handleCardClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge 
          className={`absolute top-4 right-4 ${getCategoryColor()}`}
        >
          {category}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{attendees} interested</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-medium">{organizer}</span>
          <Button 
            variant="secondary"
            onClick={handleInterestClick}
          >
            Interested
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;