import StatCard from "./StatCard";

const StatGrid = () => {
  const stats = [
    { title: "Total Posts", value: 128 },
    { title: "Engagement Rate", value: "6.4%" },
    { title: "Top Platform", value: "Instagram" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((s) => (
        <StatCard key={s.title} title={s.title} value={s.value} />
      ))}
    </div>
  );
};

export default StatGrid;