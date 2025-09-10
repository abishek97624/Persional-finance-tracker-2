
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import { Transaction, TransactionType } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface TrendsBarChartProps {
  transactions: Transaction[];
}

const TrendsBarChart: React.FC<TrendsBarChartProps> = ({ transactions }) => {
  const data = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' });
    let monthData = acc.find(d => d.name === month);
    if (!monthData) {
      monthData = { name: month, Income: 0, Expense: 0 };
      acc.push(monthData);
    }
    if (t.type === TransactionType.INCOME) {
      monthData.Income += t.amount;
    } else {
      monthData.Expense += t.amount;
    }
    return acc;
  }, [] as { name: string; Income: number; Expense: number }[]).reverse();
  
  if (data.length === 0) {
    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Monthly Trends</h3>
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                <h4 className="mt-4 text-md font-semibold text-gray-700 dark:text-gray-300">Not Enough Data</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly trends will appear when you add more transactions.</p>
            </div>
        </Card>
    )
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Monthly Trends</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(tick) => `₹${Number(tick / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="Income" fill="#22c55e" />
            <Bar dataKey="Expense" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TrendsBarChart;
