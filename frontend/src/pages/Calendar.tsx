import PageWrapper from "../components/layout/PageWrapper";
import CalendarCard from "../components/calendar/CalendarCard";

const Calendar = () => {
  // Dummy weekly content data
  const weekData = [
    { day: "Mon", posts: 0 },
    { day: "Tue", posts: 2 },
    { day: "Wed", posts: 1 },
    { day: "Thu", posts: 3 },
    { day: "Fri", posts: 0 },
    { day: "Sat", posts: 4 },
    { day: "Sun", posts: 0 },
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Content Calendar
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {weekData.map((item) => (
          <CalendarCard
            key={item.day}
            day={item.day}
            posts={item.posts}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Calendar;