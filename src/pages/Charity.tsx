import React, { useState } from "react";
import { Target, Users, DollarSign, Building, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Charity = () => {
  const campaigns = [
    {
      title: "Food for Families",
      organization: "Helping Hands",
      organizationImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-LXdiRHORWMkvsZuKo83LWN8RXvmCnvC2DQ&s",
      description: "Providing iftar meals to underprivileged families",
      raised: 8500,
      goal: 15000,
      donors: 124,
      daysLeft: 12,
      donateLink: "https://helpinghands.org/donate"
    },
    {
      title: "Build a Water Well",
      organization: "Water for All",
      organizationImage: "https://images.squarespace-cdn.com/content/v1/5bb60214f4755a2662bea695/1698246428685-V9WGBD0ICVF8FUUI20B4/water+for+all+logo+engl+%281%29.png",
      description: "Clean water access for rural communities",
      raised: 12000,
      goal: 25000,
      donors: 89,
      daysLeft: 45,
      donateLink: "https://waterforall.org/donate"
    },
    {
      title: "Education Support",
      organization: "Bright Future Foundation",
      organizationImage: "https://thebrightfuturefoundation.org/wp-content/uploads/2016/04/cropped-bright_future_foundation-LOGO.png",
      description: "School supplies for children in need",
      raised: 3200,
      goal: 8000,
      donors: 67,
      daysLeft: 18,
      donateLink: "https://brightfuturefoundation.org/donate"
    }
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCampaign(null);
    setModalOpen(false);
  };

  const proceedToDonate = () => {
    if (selectedCampaign?.donateLink) {
      window.open(selectedCampaign.donateLink, "_blank");
    }
    closeModal();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 relative">
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
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Building className="w-4 h-4 mr-1" />
                    <img
                      src={campaign.organizationImage}
                      alt={campaign.organization}
                      className="w-5 h-5 rounded-full object-cover ml-1 mr-2"
                    />
                    Organized by <span className="font-medium ml-1">{campaign.organization}</span>
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

                  <Button
                    variant="spiritual"
                    className="w-full"
                    onClick={() => openModal(campaign)}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-background rounded-lg shadow-lg max-w-sm p-6 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold mb-4">Leaving This Website</h2>
                <p className="mb-6">
                  You are about to leave this website to make a donation to <strong>{selectedCampaign?.organization}</strong>.
                  Do you want to proceed?
                </p>
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={closeModal}>
                    Go Back
                  </Button>
                  <Button variant="spiritual" onClick={proceedToDonate}>
                    Proceed
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Charity;
