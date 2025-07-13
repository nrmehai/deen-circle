import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import EventCard from "@/components/EventCard";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import mosqueImg from "@/assets/mosque.jpg";
import financeImg from "@/assets/finnances.jpg";
import iftarImg from "@/assets/iftar.jpg";
import quranImg from "@/assets/quran.jpg";
import TagBadge from "@/components/TagBadge";
import { useState } from "react";
import basketballImg from "@/assets/basketball.jpg";
import bakingImg from "@/assets/baking.jpg";
import hackImg from "@/assets/hack.jpg";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TagInput from "@/components/TagInput";
import { useRef } from "react";

export const allEvents = [
  {
    id: '1',
    title: "Friday Jummah Prayer",
    description: "Weekly congregation prayer with khutbah by Imam Abdullah",
    date: "December 15, 2024",
    time: "1:00 PM - 2:00 PM",
    location: "Masjid Al-Noor, 123 Main St",
    organizer: "Masjid Al-Noor",
    organizationLogo: '/placeholder.svg',
    attendees: 234,
    category: "prayer" as const,
    image: mosqueImg,
    interestedFriends: ['Ahmed', 'Fatima', 'Omar'],
    relatedEvents: ['2', '3', '4'],
    tags: ['prayer', 'community', 'weekly']
  },
  {
    id: '2',
    title: "Islamic Finance Workshop",
    description: "Learn about halal investment strategies and Islamic banking principles",
    date: "December 18, 2024",
    time: "6:30 PM - 8:30 PM",
    location: "Community Center Hall B",
    organizer: "Islamic Finance Institute",
    organizationLogo: '/placeholder.svg',
    attendees: 89,
    category: "education" as const,
    image: financeImg,
    interestedFriends: ['Layla', 'Bilal'],
    relatedEvents: ['1', '3', '4'],
    tags: ['finance', 'education', 'workshop']
  },
  {
    id: '3',
    title: "Community Iftar Gathering",
    description: "Join us for a blessed community iftar during Ramadan",
    date: "March 15, 2024",
    time: "6:45 PM - 8:30 PM",
    location: "Masjid Al-Noor Main Hall",
    organizer: "Community Volunteers",
    organizationLogo: '/placeholder.svg',
    attendees: 156,
    category: "community" as const,
    image: iftarImg,
    interestedFriends: ['Samir', 'Aisha'],
    relatedEvents: ['1', '2', '4'],
    tags: ['iftar', 'ramadan', 'community']
  },
  {
    id: '4',
    title: "Youth Quran Competition",
    description: "Annual Quran recitation and memorization competition for youth",
    date: "January 20, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Islamic Education Center",
    organizer: "Youth Islamic Society",
    organizationLogo: '/placeholder.svg',
    attendees: 45,
    category: "education" as const,
    image: quranImg,
    interestedFriends: ['Yusuf', 'Maryam'],
    relatedEvents: ['1', '2', '3'],
    tags: ['quran', 'youth', 'competition']
  },
  // New events
  {
    id: '5',
    title: "Brother's Basketball Session",
    description: "Weekly basketball session for brothers to bond and stay fit.",
    date: "February 10, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Community Sports Hall",
    organizer: "Brotherhood Sports",
    organizationLogo: '/placeholder.svg',
    attendees: 30,
    category: "community" as const,
    image: basketballImg,
    interestedFriends: ['Ali', 'Omar'],
    relatedEvents: ['1', '2', '3'],
    tags: [
      "BrothersOnly",
      "FaithAndFitness",
      "BrotherhoodInMotion",
      "MuslimAthletes",
      "basketball"
    ]
  },
  {
    id: '6',
    title: "Sister's Baking Class",
    description: "A fun halal baking class for sisters to learn and connect.",
    date: "February 15, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Community Kitchen",
    organizer: "Sisters Circle",
    organizationLogo: '/placeholder.svg',
    attendees: 18,
    category: "community" as const,
    image: bakingImg,
    interestedFriends: ['Amina', 'Sara'],
    relatedEvents: ['1', '2', '3'],
    tags: [
      "SistersOnly",
      "Baking",
      "HalalSweets",
      "SistersWhoBake"
    ]
  },
  {
    id: '7',
    title: "My Hack",
    description: "Muslim hackathon for youth to code for change and the Ummah.",
    date: "March 1, 2025",
    time: "9:00 AM - 9:00 PM",
    location: "Tech Innovation Center",
    organizer: "Youth Tech",
    organizationLogo: '/placeholder.svg',
    attendees: 60,
    category: "education" as const,
    image: hackImg,
    interestedFriends: ['Yusuf', 'Maryam'],
    relatedEvents: ['1', '2', '3'],
    tags: [
      "MuslimHackathon",
      "CodeForChange",
      "DeenAndDevelopment",
      "HackForUmmah",
      "YouthTechChallenge",
      "MyHack2025"
    ]
  }
];

// Dummy communities list (replace with shared source if needed)
const communitiesList = [
  { name: "Islamic Center of Maryland" },
  { name: "UMD MSA" },
  { name: "YM Gaithersburg" }
];

const Events = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    organizer: '',
    image: '',
    imageFile: null as File | null,
    tags: [] as string[],
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [events, setEvents] = useState(allEvents);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract all unique tags from allEvents
  const allTags = Array.from(new Set(events.flatMap(e => e.tags || [])));
  // Filter events by selected tags
  const filteredEvents = !selectedTag
    ? events
    : events.filter(event => event.tags?.includes(selectedTag));

  const toggleTag = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  // Form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleTagChange = (tags: string[]) => setForm(prev => ({ ...prev, tags }));
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm(prev => ({ ...prev, image: ev.target?.result as string, imageFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setForm({
      title: '', organizer: '', image: '', imageFile: null, tags: [], date: '', time: '', location: '', description: ''
    });
  };
  const handleCreateEvent = () => {
    if (!form.title || !form.organizer || !form.image || !form.date || !form.time || !form.location || !form.description) {
      alert('Please fill all required fields.');
      return;
    }
    const newEvent = {
      id: (events.length + 1).toString(),
      title: form.title,
      description: form.description,
      date: form.date,
      time: form.time,
      location: form.location,
      organizer: form.organizer,
      organizationLogo: '/placeholder.svg',
      attendees: 0,
      category: 'community' as const,
      image: form.image,
      interestedFriends: [],
      relatedEvents: [],
      tags: form.tags
    };
    setEvents([newEvent, ...events]);
    handleDrawerClose();
  };

  return (
    <div className="min-h-screen bg-gradient-peaceful">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Events</h1>
                <p className="text-muted-foreground">Discover and join Islamic events in your community</p>
              </div>
              <Button className="bg-gradient-primary hover:bg-gradient-primary/90" onClick={() => setDrawerOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 bg-card border-border"
                />
              </div>
              <Button variant="outline" className="whitespace-nowrap">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="whitespace-nowrap">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar View
              </Button>
            </div>
          </div>
          {/* Tag Filter UI */}
          <div className="mb-4 mt-1 overflow-x-auto hide-scrollbar">
            <div className="flex flex-nowrap gap-2 min-w-max">
              {allTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="focus:outline-none"
                >
                  <TagBadge tag={tag} selected={selectedTag === tag} />
                </button>
              ))}
            </div>
          </div>
          {/* Replace Drawer with Dialog for Create Event */}
          <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DialogContent className="max-w-md mx-auto w-full">
              <DialogHeader>
                <DialogTitle>Create a New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-2 p-3 max-h-[70vh] overflow-y-auto">
                <label className="block font-medium">Event Title</label>
                <input name="title" value={form.title} onChange={handleFormChange} className="w-full border rounded p-2" />

                <label className="block font-medium">Community/Organizer</label>
                <select name="organizer" value={form.organizer} onChange={handleFormChange} className="w-full border rounded p-2">
                  <option value="">Select a community</option>
                  {communitiesList.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>

                <label className="block font-medium">Image</label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="w-full" />
                {form.image && <img src={form.image} alt="Preview" className="w-full h-32 object-cover rounded mt-2" />}

                <label className="block font-medium">Tags</label>
                <TagInput value={form.tags} onChange={handleTagChange} suggestions={allTags} />

                <label className="block font-medium">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleFormChange} className="w-full border rounded p-2" />

                <label className="block font-medium">Time</label>
                <input type="time" name="time" value={form.time} onChange={handleFormChange} className="w-full border rounded p-2" />

                <label className="block font-medium">Location</label>
                <input name="location" value={form.location} onChange={handleFormChange} className="w-full border rounded p-2" />

                <label className="block font-medium">Description</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border rounded p-2" rows={3} />
              </div>
              <div className="flex gap-2 justify-end p-3">
                <Button onClick={handleCreateEvent}>Create Event</Button>
                <Button variant="outline" onClick={handleDrawerClose}>Cancel</Button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Events
            </Button>
          </div>
        </main>
      </div>
      <style>{`
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`}</style>
    </div>
  );
};

export default Events;