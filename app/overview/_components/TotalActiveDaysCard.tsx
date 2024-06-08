import React from 'react';

interface TotalActiveDaysCardProps {
  totalActiveDays: number; // Total number of active days for all developers combined
}

const TotalActiveDaysCard: React.FC<TotalActiveDaysCardProps> = ({ totalActiveDays }) => {
  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-6 ">
      <h2 className="text-lg font-semibold mb-4">Total Active Days</h2>
      <div className="text-4xl font-bold text-primary">{totalActiveDays}</div>
    </div>
  );
};

export default TotalActiveDaysCard;
