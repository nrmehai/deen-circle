import { Heart, Target, Users, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Charity = () => {
  const campaigns = [
    {
      title: "Food for Families",
      description: "Providing iftar meals to underprivileged families",
      raised: 8500,
      goal: 15000,
      donors: 124,
      daysLeft: 12
    },
    {
      title: "Build a Water Well",
      description: "Clean water access for rural communities",
      raised: 12000,
      goal: 25000,
      donors: 89,
      daysLeft: 45
    },
    {
      title: "Education Support",
      description: "School supplies for children in need",
      raised: 3200,
      goal: 8000,
      donors: 67,
      daysLeft: 18
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Donation</h1>
              <p className="text-muted-foreground">Support your community through charitable giving and volunteer work</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((campaign, index) => (
                <Card key={index} className="p-6 hover:shadow-soft transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-foreground text-lg">{campaign.title}</h3>
                    <Heart className="w-5 h-5 text-accent" />
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{campaign.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}</span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {campaign.donors} donors
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {campaign.daysLeft} days left
                    </div>
                  </div>

                  <Button variant="spiritual" className="w-full">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Charity;