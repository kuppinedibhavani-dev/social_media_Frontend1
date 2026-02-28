import { Card } from "@/components/ui/card";

interface TeamCardProps {
  name: string;
  role: string;
  tasks: number;
  img: string;
}

const TeamCard = ({ name, role, tasks, img }: TeamCardProps) => {
  return (
    <Card className="p-6 shadow-sm bg-white border rounded-xl flex gap-4 items-center hover:shadow-md transition">
      <img
        src={img}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm">{role}</p>
        <p className="text-gray-500 text-sm mt-1">{tasks} tasks assigned</p>
      </div>
    </Card>
  );
};

export default TeamCard;