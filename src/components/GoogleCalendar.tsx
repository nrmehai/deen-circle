import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
  description?: string;
}

const GoogleCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);

  // You'll need to add your Google Calendar API key to .env
  const GOOGLE_CALENDAR_API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
  const CALENDAR_ID = 'primary'; // or your specific calendar ID

  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      const timeMin = new Date().toISOString();
      const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Next 30 days
      
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
      );
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data.items || []);
      } else {
        console.error('Failed to fetch calendar events');
        // Fallback to sample events if API fails
        setEvents([
          {
            id: '1',
            summary: 'Friday Jummah Prayer',
            start: { dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
            end: { dateTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString() },
            location: 'Masjid Al-Noor',
            description: 'Weekly congregation prayer'
          },
          {
            id: '2',
            summary: 'Islamic Finance Workshop',
            start: { dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() },
            end: { dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString() },
            location: 'Community Center',
            description: 'Learn about halal investment strategies'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      // Fallback events
      setEvents([
        {
          id: '1',
          summary: 'Friday Jummah Prayer',
          start: { dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
          end: { dateTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString() },
          location: 'Masjid Al-Noor',
          description: 'Weekly congregation prayer'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const formatEventTime = (event: CalendarEvent) => {
    const startTime = event.start.dateTime || event.start.date;
    if (!startTime) return '';
    
    const date = new Date(startTime);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatEventDate = (event: CalendarEvent) => {
    const startTime = event.start.dateTime || event.start.date;
    if (!startTime) return '';
    
    const date = new Date(startTime);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return events.filter(event => {
      const eventDate = new Date(event.start.dateTime || event.start.date || '');
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  };

  // Get dates that have events for highlighting
  const getEventDates = () => {
    return events.map(event => {
      const eventDate = new Date(event.start.dateTime || event.start.date || '');
      return eventDate;
    }).filter(date => !isNaN(date.getTime()));
  };

  const eventDates = getEventDates();
  const upcomingEvents = events.slice(0, 3);
  const selectedDateEvents = getEventsForSelectedDate();

  return (
    <div className="space-y-4">
      {/* Calendar Widget */}
      <Card className="p-4 bg-card shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
            Calendar
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchCalendarEvents}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: eventDates,
            }}
            modifiersClassNames={{
              hasEvent: "bg-primary/20 text-primary font-semibold relative after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full",
            }}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.75rem] text-center",
              row: "flex w-full mt-1",
              cell: "h-8 w-8 text-center text-xs p-0 relative hover:bg-muted/50 transition-colors",
              day: "h-8 w-8 p-0 font-normal hover:bg-muted transition-colors rounded-md text-xs",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground font-semibold",
              day_outside: "text-muted-foreground/50 opacity-50",
              day_disabled: "text-muted-foreground/30 opacity-30",
            }}
          />
        </div>
        
        {/* Events for selected date */}
        {selectedDateEvents.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium text-sm mb-2">
              Events on {selectedDate?.toLocaleDateString()}
            </h4>
            <div className="space-y-2">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="p-2 rounded bg-muted/50 text-xs">
                  <div className="font-medium">{event.summary}</div>
                  <div className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3" />
                    {formatEventTime(event)}
                    {event.location && (
                      <>
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Upcoming Events List */}
      <Card className="p-4 bg-card shadow-soft">
        <h3 className="font-bold text-foreground mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-muted-foreground py-4">
              Loading events...
            </div>
          ) : upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <h4 className="font-medium text-sm mb-1">{event.summary}</h4>
                <div className="text-xs text-muted-foreground mb-2">
                  {formatEventDate(event)} at {formatEventTime(event)}
                </div>
                {event.location && (
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                )}
                <Button variant="spiritual" size="sm" className="text-xs px-3 py-1 h-7 mt-2">
                  View Details
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No upcoming events
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default GoogleCalendar;