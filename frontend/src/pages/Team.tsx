import PageWrapper from "../components/layout/PageWrapper";
import TeamCard from "@/team/TeamCard";
const Team = () => {
  const members = [
    {
      name: "Claire",
      role: "Social Media Manager",
      tasks: 12,
      img: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "John",
      role: "Graphic Designer",
      tasks: 7,
      img: "https://i.pravatar.cc/100?img=14",
    },
    {
      name: "Lisa",
      role: "Content Writer",
      tasks: 9,
      img: "https://i.pravatar.cc/100?img=29",
    },
    {
      name: "Mark",
      role: "Data Analyst",
      tasks: 5,
      img: "https://i.pravatar.cc/100?img=17",
    },
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold mb-6 ">Team Collaboration</h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Team;