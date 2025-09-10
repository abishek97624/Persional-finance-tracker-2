
import React from 'react';
import Card from '../ui/Card';
import { Transaction, TransactionType } from '../../types';
import { CATEGORY_ICONS } from '../../constants';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const recent = transactions.slice(0, 5);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {recent.length > 0 ? recent.map(t => (
          <div key={t.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-full ${t.type === TransactionType.INCOME ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'}`}>
                {CATEGORY_ICONS[t.category] || CATEGORY_ICONS.Other}
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{t.category}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.notes}</p>
              </div>
            </div>
            <div className="text-right">
                <p className={`font-semibold ${t.type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === TransactionType.INCOME ? '+' : '-'}{formatCurrency(t.amount)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(t.date)}</p>
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h4 className="mt-4 text-md font-semibold text-gray-700 dark:text-gray-300">No Transactions Yet</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your recent transactions will appear here.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecentTransactions;
