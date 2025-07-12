import { useState } from "react";
import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "groups">("posts");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg" alt="Profile" className="w-32 h-32 rounded-full object-cover border"/>

              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold">Yahya Abdullah</h1>
                <p className="text-muted-foreground">
                    Free Palestine
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Friends: <strong>42</strong></span>
                  <span>Groups: <strong>5</strong></span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border flex gap-4">
              <Button
                variant={activeTab === "posts" ? "default" : "ghost"}
                onClick={() => setActiveTab("posts")}
              >
                Posts
              </Button>
              <Button
                variant={activeTab === "groups" ? "default" : "ghost"}
                onClick={() => setActiveTab("groups")}
              >
                Groups
              </Button>
            </div>

            {/* Tab Content */}
            <div className="h-96 overflow-y-auto space-y-4">
              {activeTab === "posts" && (
                <>
                  <Card className="p-4">Going to my first Hackathon at the Islamic Center of Maryland!</Card>
                </>
              )}
              {activeTab === "groups" && (
                <>
                  <Card className="p-4">Islamic Center of Maryland</Card>
                  <Card className="p-4">UMD MSA</Card>
                  <Card className="p-4">YM Gaithersburg</Card>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
