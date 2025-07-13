import { useState } from "react";
import { BookOpen, Users, Calendar, Star, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Link } from 'react-router-dom';
import TagBadge from "@/components/TagBadge";
import { useEvents } from '@/components/EventContext';

const Learning = () => {
  const { events } = useEvents();
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = Array.from(new Set(events.flatMap(event => event.tags)));

  const filteredEvents = selectedTag
    ? events.filter(event => event.tags.includes(selectedTag))
    : events;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Islamic Learning</h1>
              <p className="text-muted-foreground">Enhance your knowledge of Islam through structured courses and study groups</p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className="focus:outline-none"
                >
                  <TagBadge tag={tag} selected={selectedTag === tag} />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <Link key={index} to={`/learning/${event.slug}`}>
                  <Card className="overflow-hidden hover:shadow-soft transition-shadow cursor-pointer">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">by {event.instructor}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {event.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="flex items-center text-xs bg-accent text-background rounded-full px-2 py-0.5"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.students}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current text-accent" />
                          {event.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.duration}
                        </div>
                      </div>

                      <Button variant="spiritual" className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Enroll Now
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Learning;