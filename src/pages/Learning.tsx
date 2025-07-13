import { useState } from "react";
import { BookOpen, Users, Calendar, Star, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Link } from 'react-router-dom';
import TagBadge from "@/components/TagBadge";

const courses = [
  {
    slug: "quran-recitation-basics",
    title: "Quran Recitation Basics",
    instructor: "Sheikh Ahmad",
    students: 45,
    rating: 4.9,
    duration: "6 weeks",
    tags: ["Quran", "Recitation"],
    image: "https://productivemuslim.com/wp-content/uploads/2012/09/Quran-2.jpg"
  },
  {
    slug: "islamic-history",
    title: "Islamic History",
    instructor: "Dr. Fatima",
    students: 32,
    rating: 4.8,
    duration: "8 weeks",
    tags: ["History"],
    image: "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/sites/default/files/20200201_BKP506.jpg"
  },
  {
    slug: "arabic-language-foundation",
    title: "Arabic Language Foundation",
    instructor: "Ustaz Muhammad",
    students: 28,
    rating: 4.7,
    duration: "12 weeks",
    tags: ["Language", "Arabic"],
    image: "https://lh7-us.googleusercontent.com/X_wsvRJsXMjDw8zlNIQhr_5KhtgZQl2o3qTAnh5ESRCfGIPbw427C2ZTH8kfY7MdlL83MaxObI_oP_dic_q98-7InA1Zn_3gKhVcX0CEFzdp2YnOWOxM9DUQx_cbjo0SP1BnWQ_IMfA-UtqGfLybluM"
  }
];

const Learning = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = Array.from(new Set(courses.flatMap(course => course.tags)));

  const filteredCourses = selectedTag
    ? courses.filter(course => course.tags.includes(selectedTag))
    : courses;

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
              {filteredCourses.map((course, index) => (
                <Link key={index} to={`/learning/${course.slug}`}>
                  <Card className="overflow-hidden hover:shadow-soft transition-shadow cursor-pointer">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {course.tags.map((tag, idx) => (
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