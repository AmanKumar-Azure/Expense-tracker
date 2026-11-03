import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog.jsx'
import { formatCategory, formatDate, formatMoney } from './format.js'

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <section className="transactions" aria-labelledby="transactions-heading">
      <div className="transactions-header">
        <h2 id="transactions-heading">Transactions</h2>
        <div className="filters">
          <label className="visually-hidden" htmlFor="filter-type">Filter by type</label>
          <select id="filter-type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <label className="visually-hidden" htmlFor="filter-category">Filter by category</label>
          <select id="filter-category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{formatCategory(cat)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col" className="col-amount">Amount</th>
              <th scope="col"><span className="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="table-empty">
                  {transactions.length === 0
                    ? "No transactions yet. Add one above to get started."
                    : "No transactions match these filters."}
                </td>
              </tr>
            ) : (
              filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td className="col-date">{formatDate(t.date)}</td>
                  <td className="col-description">{t.description}</td>
                  <td className="col-category">{formatCategory(t.category)}</td>
                  <td className={`col-amount ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                    {t.type === "income" ? "+" : "−"}{formatMoney(t.amount)}
                  </td>
                  <td className="col-action">
                    <button
                      type="button"
                      className="delete-btn"
                      aria-label={`Delete ${t.description}`}
                      onClick={() => setPendingDelete(t)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pendingDelete && (
        <ConfirmDialog
          message={`Delete "${pendingDelete.description}" (${formatMoney(pendingDelete.amount)})? This can't be undone.`}
          onConfirm={() => {
            onDelete(pendingDelete.id);
            setPendingDelete(null);
          }}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </section>
  );
}

export default TransactionList
