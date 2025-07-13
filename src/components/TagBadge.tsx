import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  tag: string;
}

const TagBadge = ({ tag }: TagBadgeProps) => (
  <Badge className="mr-1 mb-1 bg-blue-600 text-white rounded-full">
    {tag}
  </Badge>
);

export default TagBadge; 