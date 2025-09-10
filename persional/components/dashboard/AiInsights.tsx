
import React, { useState, useCallback } from 'react';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import { getFinancialInsights } from '../../services/geminiService';
import { Transaction } from '../../types';

interface AiInsightsProps {
    transactions: Transaction[];
}

const AiInsights: React.FC<AiInsightsProps> = ({ transactions }) => {
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGetInsights = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setInsights('');
    try {
      const result = await getFinancialInsights(transactions);
      setInsights(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [transactions]);

  const renderInsights = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('###')) {
        return <h4 key={index} className="text-md font-bold mt-4 mb-2 text-gray-800 dark:text-gray-200">{line.replace('###', '')}</h4>;
      }
      if (line.startsWith('**')) {
        return <p key={index} className="mt-3"><strong className="text-gray-700 dark:text-gray-300">{line.replace(/\*\*/g, '')}</strong></p>;
      }
      if (line.startsWith('-')) {
        return <li key={index} className="ml-4 list-disc text-gray-600 dark:text-gray-400">{line.substring(1).trim()}</li>;
      }
      return <p key={index} className="my-1 text-gray-600 dark:text-gray-400">{line}</p>;
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">AI Financial Assistant</h3>
        <button
          onClick={handleGetInsights}
          disabled={isLoading}
          className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:bg-primary-300 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? <Spinner /> : 'Get Insights'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {insights ? (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {renderInsights(insights)}
        </div>
      ) : (
         !isLoading && <p className="text-gray-500 dark:text-gray-400">Click "Get Insights" to analyze your recent transactions and receive personalized financial tips.</p>
      )}
    </Card>
  );
};

export default AiInsights;
