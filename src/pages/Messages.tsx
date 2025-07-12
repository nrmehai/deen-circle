import { MessageCircle, Search, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Messages = () => {
  const conversations = [
    {
      name: "Ahmad Khan",
      lastMessage: "Assalamu alaikum brother",
      time: "5m ago",
      unread: 2,
      avatar: "/placeholder.svg"
    },
    {
      name: "Fatima Ahmad",
      lastMessage: "JazakAllahu khair for the reminder",
      time: "1h ago",
      unread: 0,
      avatar: "/placeholder.svg"
    },
    {
      name: "Community Group",
      lastMessage: "Don't forget tonight's event",
      time: "2h ago",
      unread: 5,
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
              <p className="text-muted-foreground">Connect with your community members respectfully</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Conversations List */}
              <Card className="p-4 lg:col-span-1">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  {conversations.map((conversation, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <Avatar>
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Chat Area */}
              <Card className="p-4 lg:col-span-2 flex flex-col">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Ahmad Khan</h3>
                    <p className="text-sm text-muted-foreground">Active now</p>
                  </div>
                </div>

                <div className="flex-1 py-4">
                  <div className="text-center text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button variant="spiritual" size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;