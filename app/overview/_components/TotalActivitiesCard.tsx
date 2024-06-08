import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import ActivityDistributionLegend from "./ActivityDistributionLegend";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  teamData: {
    name: string;
    activities: { label: string; count: number; fillColor: string }[];
  }[];
  activityMeta: {
    label: string;
    fillColor: string;
  }[];
}

const TotalActivitiesCard: React.FC<Props> = ({ teamData, activityMeta }) => {
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleChangeTeam = (value: string) => {
    const index = parseInt(value);
    if (!isNaN(index) && index >= 0 && index < teamData.length) {
      setSelectedTeamIndex(index);
    }
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.label}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#fff"
        >{`Count ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <div className="flex flex-col items-right bg-gray-800 text-white rounded-lg shadow-md p-6 gap-10">
      {/* Dropdown Selector */}
      <h2 className="text-lg font-semibold">See activities of Developers</h2>
      <Select
        value={selectedTeamIndex !== null ? selectedTeamIndex.toString() : ""}
        onValueChange={handleChangeTeam}
      >
        <SelectTrigger className="my-2 p-2 border border-gray-600 rounded w-[180px] bg-gray-700 text-white">
          <SelectValue placeholder="Select a Team" />
        </SelectTrigger>
        <SelectContent className="bg-gray-700 text-white">
          {teamData.map((team, index) => (
            <SelectItem key={index} value={index.toString()}>
              {team.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Conditionally Render Content */}
      {selectedTeamIndex !== null ? (
        <div className="flex mt-4">
          <ResponsiveContainer width="85%" height={400}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={teamData[selectedTeamIndex]?.activities || []}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                onMouseEnter={onPieEnter}
                label
              >
                {(teamData[selectedTeamIndex]?.activities || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fillColor} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <ActivityDistributionLegend activityMeta={activityMeta} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-4 p-10 border border-dashed border-gray-600 rounded-lg">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 2h10v10H5V5z" />
          </svg>
          <p className="text-gray-400 text-center">
            Select a team to see the activity distribution.
          </p>
        </div>
      )}
    </div>
  );
};

export default TotalActivitiesCard;
