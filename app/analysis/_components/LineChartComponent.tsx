// LineChartComponent.tsx
import React from "react";
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

interface LineChartProps {
  data: any[]; // Update the data type as per your requirement
  activityColors: Record<string, string>;
}

const LineChartComponent: React.FC<LineChartProps> = ({ data, activityColors }) => {
    console.log("data",data);
    console.log("colors",activityColors);


  return (
    <ResponsiveContainer width={1100} height={500}>
      <LineChart
        data={data}
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
  );
};

export default LineChartComponent;
