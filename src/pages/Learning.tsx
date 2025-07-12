import { BookOpen, Users, Calendar, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Learning = () => {
  const courses = [
    {
      title: "Quran Recitation Basics",
      instructor: "Sheikh Ahmad",
      students: 45,
      rating: 4.9,
      duration: "6 weeks",
      image: "/placeholder.svg"
    },
    {
      title: "Islamic History",
      instructor: "Dr. Fatima",
      students: 32,
      rating: 4.8,
      duration: "8 weeks",
      image: "/placeholder.svg"
    },
    {
      title: "Arabic Language Foundation",
      instructor: "Ustaz Muhammad",
      students: 28,
      rating: 4.7,
      duration: "12 weeks",
      image: "/placeholder.svg"
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Islamic Learning</h1>
              <p className="text-muted-foreground">Enhance your knowledge of Islam through structured courses and study groups</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-soft transition-shadow">
                  <div className="aspect-video bg-gradient-peaceful"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-accent" />
                        {course.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {course.duration}
                      </div>
                    </div>

                    <Button variant="spiritual" className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Enroll Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Learning;