
import React from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <Card className="flex items-center space-x-4">
      <div className={`p-3 rounded-full ${colorClass}`}>
        {React.cloneElement(icon, { className: "h-6 w-6 text-white" })}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
      </div>
    </Card>
  );
};

export default StatCard;
