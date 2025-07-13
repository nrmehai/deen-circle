import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  tag: string;
  selected?: boolean;
}

const TagBadge = ({ tag, selected }: TagBadgeProps) => (
  <Badge className={`mr-1 mb-1 rounded-full ${selected ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'}`}>
    {tag}
  </Badge>
);

export default TagBadge; 