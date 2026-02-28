import { Card } from "../ui/card";

interface AnalyticsMetricProps {
  title: string;
  value: string | number;
}

const AnalyticsMetric = ({ title, value }: AnalyticsMetricProps) => {
  return (
    <Card className="p-6 shadow-sm bg-white border rounded-xl hover:shadow-md transition">
      <h3 className="text-gray-600 font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </Card>
  );
};

export default AnalyticsMetric;