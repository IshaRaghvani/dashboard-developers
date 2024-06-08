import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

interface TotalActivity {
  name: string;
  value: string;
}

interface DayWiseActivity {
  date: string;
  items: {
    children: {
      count: string;
      label: string;
      fillColor: string;
    }[];
  };
}

interface Row {
  date: string;
  name: string;
  totalActivity: TotalActivity[];
  dayWiseActivity?: DayWiseActivity[]; // Make dayWiseActivity optional
  developers?: Developer[]; // Add the developers property
}
interface Developer {
  name: string;
  activityCounts: Record<string, number>;
}

interface DayWiseActivitiesCardProps {
  data: Row[];
}

const DayWiseActivitiesCard: React.FC<DayWiseActivitiesCardProps> = ({
  data,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  console.log(data);
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  // Function to extract activity count for a specific date
  // Function to extract activity count for a specific date
  const getActivityCountForDate = (rowData: Row) => {
    console.log("Row Data:", rowData);
    console.log("Date to find:", rowData.date);

    // Find the day activity for the specific date
    const dayActivity = rowData.dayWiseActivity?.find(
        (day) => day.date === rowData.date
    );

    console.log("Day Activity:", dayActivity);

    if (dayActivity) {
        // Sum up the activity counts of all developers for the specific date
        const totalActivityCount = dayActivity.items.children.reduce(
            (total, child) => total + parseInt(child.count),
            0
        );

        console.log("Total Activity Count for Date:", totalActivityCount);
        return totalActivityCount;
    }

    console.log("No matching day activity found");
    return 0;
};


  // Generate dropdown options from available dates
  const dropdownOptions =
    data[0]?.dayWiseActivity?.map((day) => day.date) || [];

  return (
    <div className="p-4 border rounded shadow-md" style={{ width: "100%" }}>
      <h3 className="text-lg font-bold mb-4">Day Wise Activities</h3>
      <select
        value={selectedDate}
        onChange={(e) => handleDateChange(e.target.value)}
      >
        <option value="">Select Date</option>
        {dropdownOptions.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
      <div style={{ marginTop: "20px" }}>
        <CalendarHeatmap
          startDate={new Date(dropdownOptions[0])}
          endDate={new Date(dropdownOptions[dropdownOptions.length - 1])}
          values={data.map((row, index) => ({
            date: new Date(row.name),
            count: getActivityCountForDate(row, selectedDate),
          }))}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-github-${value.count}`;
          }}
        />
      </div>
    </div>
  );
};

export default DayWiseActivitiesCard;
