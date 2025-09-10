import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/Transactions';
import Modal from './components/ui/Modal';
import TransactionForm from './components/transactions/TransactionForm';
import { Transaction, TransactionData, TransactionType, Category } from './types';

// Initial mock data
const initialTransactions: Transaction[] = [
    { id: '1', date: '2024-07-28', amount: 60000, type: TransactionType.INCOME, category: Category.SALARY, notes: 'Monthly salary' },
    { id: '2', date: '2024-07-27', amount: 15000, type: TransactionType.EXPENSE, category: Category.RENT, notes: 'Apartment rent' },
    { id: '3', date: '2024-07-26', amount: 3500, type: TransactionType.EXPENSE, category: Category.FOOD, notes: 'Groceries' },
    { id: '4', date: '2024-07-25', amount: 1200, type: TransactionType.EXPENSE, category: Category.TRANSPORT, notes: 'Petrol' },
    { id: '5', date: '2024-07-24', amount: 2500, type: TransactionType.EXPENSE, category: Category.UTILITIES, notes: 'Electricity Bill' },
];


// Placeholder pages for other routes
const BudgetsPage = () => <div className="p-8"><h1 className="text-2xl font-bold dark:text-white">Budgets</h1></div>;
const GoalsPage = () => <div className="p-8"><h1 className="text-2xl font-bold dark:text-white">Goals</h1></div>;
const ProfilePage = () => <div className="p-8"><h1 className="text-2xl font-bold dark:text-white">Profile</h1></div>;

const navItems = [
  { path: '/', name: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
  { path: '/transactions', name: 'Transactions', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" /></svg> },
  { path: '/budgets', name: 'Budgets', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm12 6a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4a2 2 0 012-2h8zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H13z" clipRule="evenodd" /></svg> },
  { path: '/goals', name: 'Goals', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6z" /><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM5.293 16.707a1 1 0 010-1.414l1.414-1.414a1 1 0 111.414 1.414l-1.414 1.414a1 1 0 01-1.414 0zM6.707 3.293a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414L6.707 4.707a1 1 0 010-1.414zM13.293 11.293a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zM3.293 6.707a1 1 0 010-1.414l1.414-1.414a1 1 0 111.414 1.414L4.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> },
];

const ThemeSwitcher: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
    
    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400">
            {isDarkMode ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            }
        </button>
    );
};

const Sidebar: React.FC<{isSidebarOpen: boolean}> = ({ isSidebarOpen }) => {
    const location = useLocation();
    
    return (
        <aside className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-lg z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64`}>
            <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
                <svg className="h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">FinTrack</span>
            </div>
            <nav className="mt-6 flex flex-col space-y-1">
                {navItems.map(item => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-4 py-2 mx-4 rounded-lg transition-colors duration-200 ${location.pathname === item.path ? 'bg-primary-500 text-white font-semibold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium'}`}
                    >
                        {item.icon}
                        <span className="mx-3">{item.name}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
    return (
        <header className="sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-20 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <button onClick={toggleSidebar} className="md:hidden text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                 <div className="flex-1 md:flex-none"></div>
                <div className="flex items-center space-x-4">
                    <ThemeSwitcher />
                    <Link to="/profile" className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src="https://i.pravatar.cc/100" alt="User profile" className="w-full h-full object-cover"/>
                    </Link>
                </div>
            </div>
        </header>
    );
};

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTransaction(null);
  };

  const handleSaveTransaction = (data: TransactionData) => {
    if (editingTransaction) {
      // Update
      setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? { ...t, ...data } : t).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } else {
      // Add
      const newTransaction: Transaction = { id: crypto.randomUUID(), ...data };
      setTransactions(prev => [newTransaction, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
    handleCloseModal();
  };

  const handleDeleteTransaction = (id: string) => {
    if(window.confirm('Are you sure you want to delete this transaction?')) {
        setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Dashboard transactions={transactions} />} />
              <Route path="/transactions" element={
                <TransactionsPage 
                  transactions={transactions} 
                  onAdd={handleOpenAddModal} 
                  onEdit={handleOpenEditModal} 
                  onDelete={handleDeleteTransaction}
                />} 
              />
              <Route path="/budgets" element={<BudgetsPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </main>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm 
          onSubmit={handleSaveTransaction} 
          onCancel={handleCloseModal}
          initialData={editingTransaction}
        />
      </Modal>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
};

export default App;