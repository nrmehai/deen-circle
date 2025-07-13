import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, ChevronLeft, Share2, Calendar, Clock } from 'lucide-react';

const courses = [
  {
    slug: "quran-recitation-basics",
    title: "Quran Recitation Basics",
    instructor: "Sheikh Ahmad",
    students: 45,
    rating: 4.9,
    duration: "6 weeks",
    image: "https://productivemuslim.com/wp-content/uploads/2012/09/Quran-2.jpg",
    category: "Quran",
    description: "Learn the basics of Quranic recitation, proper pronunciation, and tajweed with Sheikh Ahmad."
  },
  {
    slug: "islamic-history",
    title: "Islamic History",
    instructor: "Dr. Fatima",
    students: 32,
    rating: 4.8,
    duration: "8 weeks",
    image: "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/sites/default/files/20200201_BKP506.jpg",
    category: "History",
    description: "Explore key events, personalities, and milestones in Islamic history with Dr. Fatima."
  },
  {
    slug: "arabic-language-foundation",
    title: "Arabic Language Foundation",
    instructor: "Ustaz Muhammad",
    students: 28,
    rating: 4.7,
    duration: "12 weeks",
    image: "https://lh7-us.googleusercontent.com/X_wsvRJsXMjDw8zlNIQhr_5KhtgZQl2o3qTAnh5ESRCfGIPbw427C2ZTH8kfY7MdlL83MaxObI_oP_dic_q98-7InA1Zn_3gKhVcX0CEFzdp2YnOWOxM9DUQx_cbjo0SP1BnWQ_IMfA-UtqGfLybluM",
    category: "Language",
    description: "Master the foundation of Arabic grammar, vocabulary, and conversation skills."
  }
];

const upcomingSessions = [
  {
    id: '1',
    courseSlug: 'quran-recitation-basics',
    title: 'Introduction to Tajweed',
    date: 'July 20, 2025',
    time: '5:00 PM',
  },
  {
    id: '2',
    courseSlug: 'quran-recitation-basics',
    title: 'Practice Session: Surah Al-Fatiha',
    date: 'July 22, 2025',
    time: '6:30 PM',
  },
  {
    id: '3',
    courseSlug: 'islamic-history',
    title: 'The Life of the Prophet Muhammad (PBUH)',
    date: 'July 23, 2025',
    time: '4:00 PM',
  }
];

const CoursePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Course Not Found</h1>
      </div>
    );
  }

  const sessions = upcomingSessions.filter(session => session.courseSlug === course.slug);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="container mx-auto space-y-6">

            <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4" />
              Back to Learning
            </Button>

            <Card className="overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-64 object-cover"/>
              <div className="p-6 space-y-4">
                <Badge>{course.category}</Badge>
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="text-muted-foreground">{course.description}</p>

                <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary"/>
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary"/>
                    Duration: {course.duration}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">Enroll Now</Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4"/> Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Upcoming Sessions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
              {sessions.length > 0 ? (
                <div className="space-y-4">
                  {sessions.map(session => (
                    <Card key={session.id} className="p-4">
                      <h3 className="text-lg font-semibold">{session.title}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground mt-2">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4"/> {session.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4"/> {session.time}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No upcoming sessions scheduled yet.</p>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursePage;
