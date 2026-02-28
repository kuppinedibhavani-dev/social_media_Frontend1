import { Card } from "../ui/card";

interface Props {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: Props) => {
  return (
    <Card className="p-6 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl transition-colors">

      <h3 className="text-gray-700 dark:text-gray-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </Card>
  );
};

export default StatCard;