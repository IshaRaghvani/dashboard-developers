import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AuthorActivitiesCardProps {
  teamData: {
    name: string;
    activities: { label: string; count: number; fillColor: string }[];
  }[];
  activityMeta: { label: string; fillColor: string }[];
}

const AuthorActivitiesCard: React.FC<AuthorActivitiesCardProps> = ({ teamData, activityMeta }) => {
  // Extract labels from activityMeta
  const labels = activityMeta.map(meta => meta.label);
  console.log("Labels:", labels);

  // Create data for the chart
  const data = labels.map(label => ({
    name: label,
    ...teamData.reduce((acc, member) => {
      const activity = member.activities.find(activity => activity.label === label);
      acc[member.name] = activity ? activity.count : 0;
      return acc;
    }, {} as Record<string, number>)
  }));

  // Log data for verification
  console.log("Data:", data);

  return (
    <div className="bg-gray-700 p-9 rounded shadow-md ">
      <h3 className="text-lg font-bold mb-4">Total Activities By Author</h3>
      <ResponsiveContainer width={600} height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {teamData.map((member, index) => (
            <Bar key={member.name} dataKey={member.name} stackId="a" fill={member.activities[index]?.fillColor} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AuthorActivitiesCard;
