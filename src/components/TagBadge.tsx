import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  tag: string;
  selected?: boolean;
  className?: string;
}

function capitalizeTag(tag: string) {
  return tag.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before camelCase
    .replace(/_/g, ' ') // Replace underscores with space
    .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize each word
}

const TagBadge = ({ tag, selected, className }: TagBadgeProps) => (
  <Badge className={`mr-1 mb-1 rounded-full ${selected ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'} ${className || ''}`}>
    {capitalizeTag(tag)}
  </Badge>
);

export default TagBadge; 