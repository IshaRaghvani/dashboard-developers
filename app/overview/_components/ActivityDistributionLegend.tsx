import React from 'react';

interface ActivityMeta {
  label: string;
  fillColor: string;
}

interface Props {
  activityMeta: ActivityMeta[];
}

const ActivityDistributionLegend: React.FC<Props> = ({ activityMeta }) => {
  return (
    <div className="activity-legend font-sans">
      <h2 className="text-xl font-semibold mb-4"></h2>
      {activityMeta.map((activity, index) => (
        <div key={index} className="legend-item flex items-center mb-2">
          <div className="legend-color w-3 h-3 rounded-full mr-2" style={{ backgroundColor: activity.fillColor }}></div>
          <div className=" text-sm font-medium">{activity.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ActivityDistributionLegend;
