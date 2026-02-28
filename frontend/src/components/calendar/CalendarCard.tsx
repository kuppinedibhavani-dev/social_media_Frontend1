interface Props {
  day: string;
  posts: number;
}

const CalendarCard = ({ day, posts }: Props) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm transition-all">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{day}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {posts === 0 ? "No posts" : `${posts} scheduled`}
      </p>
    </div>
  );
};

export default CalendarCard;