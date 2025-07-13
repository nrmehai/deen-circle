import { Card } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";

type Props = {
  name: string;
  description: string;
  location: string;
  attendees: number;
  image: string; // New image prop
};

const CommunityCard = ({
  name,
  description,
  location,
  attendees,
  image
}: Props) => (
  <Card className="overflow-hidden">
    <img
      src={image}
      alt={name}
      className="w-full h-40 object-cover"
    />
    <div className="p-4 space-y-2">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
      <div className="text-sm flex flex-col gap-1">
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4" /> {location}
        </span>
        <span className="flex items-center gap-2">
          <Users className="w-4 h-4" /> {attendees} members
        </span>
      </div>
    </div>
  </Card>
);

export default CommunityCard;
