import AnalyticsMetric from "./AnalyticsMetric";

const AnalyticsGrid = () => {
  const metrics = [
    { title: "Total Likes", value: "4,321" },
    { title: "Total Comments", value: "1,104" },
    { title: "Total Shares", value: "892" },
    { title: "CTR", value: "3.2%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <AnalyticsMetric
          key={metric.title}
          title={metric.title}
          value={metric.value}
        />
      ))}
    </div>
  );
};

export default AnalyticsGrid;