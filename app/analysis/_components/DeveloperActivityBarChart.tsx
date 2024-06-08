'use client';
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ActivityData {
  name: string; // Developer name
  totalActivity: {
    name: string; // Activity name
    value: number; // Activity count (ensure this is a number)
  }[];
}

const DeveloperActivityBarChart: React.FC = () => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [activityColors, setActivityColors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Extract and transform the data for the bar chart
        const transformedData: ActivityData[] =
          data.data.AuthorWorklog.rows.map((row: any) => ({
            name: row.name,
            totalActivity: row.totalActivity.map((activity: any) => ({
              name: activity.name,
              value: parseInt(activity.value),
            })),
          }));

        // Further transformation for stacked bar chart
        const stackedData: ActivityData[] = transformedData.flatMap(
          (developerData) =>
            developerData.totalActivity.map((activity) => ({
              name: developerData.name, // Developer name
              totalActivity: [{ name: activity.name, value: activity.value }], // Activity data
            }))
        );

        setActivityData(stackedData);

        // Extract activity colors from the JSON data
        const colors: Record<string, string> = {};
        data.data.AuthorWorklog.activityMeta.forEach((activity: any) => {
          colors[activity.label] = activity.fillColor;
        });
        setActivityColors(colors);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-6 bg-white text-gray-800 ">
      <h1 className="text-3xl mb-6">Developer Activity Breakdown</h1>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={activityData}
          layout="vertical" // Vertical layout for better readability
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Render bars for each activity type */}
          {Object.keys(activityColors).map((activityName) => (
            <Bar
              key={activityName}
              dataKey={(dataItem) =>
                dataItem.totalActivity.find(
                  (act: { name: string; value: number }) =>
                    act.name === activityName
                )?.value
              }
              fill={activityColors[activityName]}
              stackId="a"
              name={activityName}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeveloperActivityBarChart;