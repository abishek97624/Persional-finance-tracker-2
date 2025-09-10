import React from 'react';
import Card from '../components/ui/Card';
import { Transaction, TransactionType } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { formatCurrency, formatDate } from '../utils/formatters';

interface TransactionsPageProps {
  transactions: Transaction[];
  onAdd: () => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ transactions, onAdd, onEdit, onDelete }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">All Transactions</h1>
        <button onClick={onAdd} className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          <span>Add Transaction</span>
        </button>
      </div>

      <Card className="!p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center space-x-3">
                       <div className={`p-2 rounded-full ${t.type === TransactionType.INCOME ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'}`}>
                        {CATEGORY_ICONS[t.category] || CATEGORY_ICONS.Other}
                      </div>
                      <div>
                        <p>{t.category}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{t.notes}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{formatDate(t.date)}</td>
                  <td className={`px-6 py-4 font-semibold ${t.type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === TransactionType.INCOME ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => onEdit(t)} className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Edit</button>
                    <button onClick={() => onDelete(t.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No transactions found. Add one to get started!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TransactionsPage;