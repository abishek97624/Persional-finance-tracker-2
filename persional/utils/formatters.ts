
/**
 * Formats a number into the Indian Rupee currency format (e.g., ₹50,000.00).
 * @param amount - The number to format.
 * @returns A string representing the formatted currency.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

/**
 * Formats a date string into a more readable format (e.g., 20 Jul 2024).
 * @param dateString - The ISO date string.
 * @returns A string representing the formatted date.
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
