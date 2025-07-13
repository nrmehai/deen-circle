// src/pages/CommunityPage.tsx
import { useParams } from "react-router-dom";

const CommunityPage = () => {
  const { slug } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Community: {slug}</h1>
      {/* You can fetch community data based on slug here */}
    </div>
  );
};

export default CommunityPage;