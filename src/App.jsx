import { useState } from 'react'
import Summary from './Summary.jsx'
import TransactionForm from './TransactionForm.jsx'
import TransactionList from './TransactionList.jsx'
import SpendingChart from './SpendingChart.jsx'
import { INITIAL_TRANSACTIONS } from './constants.js'
import './App.css'

const CATEGORIES = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const handleAdd = (newTransaction) => {
    setTransactions(prev => [...prev, newTransaction]);
  };

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <header className="passbook">
        <h1>Finance Tracker</h1>
        <Summary transactions={transactions} />
      </header>

      <div className="workspace">
        <main className="workspace-main">
          <TransactionForm categories={CATEGORIES} onAdd={handleAdd} />
          <TransactionList transactions={transactions} categories={CATEGORIES} onDelete={handleDelete} />
        </main>

        <aside className="workspace-aside">
          <SpendingChart transactions={transactions} />
        </aside>
      </div>
    </div>
  );
}

export default App
