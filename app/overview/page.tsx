'use client';
import React, { useState, useEffect } from "react";
import TotalActivitiesCard from "./_components/TotalActivitiesCard";
import TotalActiveDaysCard from "./_components/TotalActiveDaysCard";
import AuthorActivitiesCard from "./_components/AuthorActivitiesCard";

interface Row {
  name: string;
  totalActivity: { name: string; value: string }[];
}
interface Meta {
  label: string;
  fillColor: string;
}

const Overview: React.FC = () => {
  const [teamData, setTeamData] = useState<
    {
      name: string;
      activities: { label: string; count: number; fillColor: string }[];
    }[]
  >([]);
  const [activityMeta, setActivityMeta] = useState<
    { label: string; fillColor: string }[]
  >([]);

  useEffect(() => {
    // Fetch data from the JSON file or any other data source
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const { rows } = data.data.AuthorWorklog;

        // Extract activity meta data
        const activityMeta = Array.isArray(data.data.AuthorWorklog.activityMeta)
          ? data.data.AuthorWorklog.activityMeta
          : [data.data.AuthorWorklog.activityMeta];
        setActivityMeta(activityMeta);

        // Extract team data from the fetched JSON data
        const teamData = rows.map((row: Row) => ({
          name: row.name,
          activities: row.totalActivity.map((activity) => ({
            label: activity.name,
            count: parseInt(activity.value),
            fillColor:
              activityMeta.find((meta: Meta) => meta.label === activity.name)
                ?.fillColor || "#000000", // Default color if not found
          })),
        }));
        setTeamData(teamData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex-col">
      <div className="gap-10 mb-10">
        <TotalActivitiesCard teamData={teamData} activityMeta={activityMeta} />
        {/* Add additional card components here */}
      </div>
      <div className="flex justify-content gap-10">
        <TotalActiveDaysCard totalActiveDays={100} />
        <TotalActiveDaysCard totalActiveDays={100} />
        <div className="ml-15">
        <AuthorActivitiesCard teamData={teamData} activityMeta={activityMeta} />
        </div>
      </div>
      
    </div>
  );
};

export default Overview;
