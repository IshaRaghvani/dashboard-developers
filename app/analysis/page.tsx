'use client';
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


interface Row {
  name: string;
  totalActivity: TotalActivity[];
  dayWiseActivity: DayWiseActivity[];
}

interface TotalActivity {
  name: string;
  value: string;
}

interface DayWiseActivity {
  date: string;
  items: {
    children: Activity[];
  };
}

interface Activity {
  count: string;
  label: string;
  fillColor: string;
}

interface ActivityData {
  date: string;
  developers: DeveloperActivity[];
}

interface DeveloperActivity {
  name: string;
  activityCounts: Record<string, number>;
  activeDays: {
    days: number;
    isBurnOut: boolean;
    insight: string[];
  };
}
interface Row {
  name: string;
  totalActivity: TotalActivity[];
  dayWiseActivity: DayWiseActivity[];
  activeDays: {
    days: number;
    isBurnOut: boolean;
    insight: string[];
  };
}

const Analysis: React.FC = () => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [activityColors, setActivityColors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const rows: Row[] = data.data.AuthorWorklog.rows;
        rows.forEach((row: any) => {
          console.log("activeDays", row.activeDays);
        });
  
        const transformedData: ActivityData[] = rows.flatMap((row: Row) => {
          const developers = [{ // Create a developer object for each row
            name: row.name,
            activityCounts: row.totalActivity.reduce((acc: Record<string, number>, activity: TotalActivity) => {
              acc[activity.name] = parseInt(activity.value);
              return acc;
            }, {}),
            
            activeDays: row.activeDays || { days: 0, isBurnOut: false, insight: [] } // Set default if not provided
          }];
          
  
          return row.dayWiseActivity.map((dayActivity: DayWiseActivity) => ({
            date: dayActivity.date,
            developers: developers, // Associate each developer with the day's activity
            ...dayActivity.items.children.reduce((acc, item) => {
              acc[item.label] = parseInt(item.count);
              return acc;
            }, {} as { [key: string]: number }),
          }));
        });
  
        console.log("Transformed Data:", transformedData);
  
        setActivityData(transformedData);
  
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
    <div className="p-10 bg-white text-gray-800 rounded-lg shadow-xl">
      <h1 className="text-3xl mb-6">Analysis</h1>

      <ResponsiveContainer width={1100} height={500}>
        <LineChart
          data={activityData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" className="" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(activityColors).map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={activityColors[key]}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {/* Render the BurnoutIndicator component */}
      <div className="mt-6">
        {/* <DayWiseActivitiesCard data={activityData} /> */}
      </div>
    </div>
  );
};

export default Analysis;