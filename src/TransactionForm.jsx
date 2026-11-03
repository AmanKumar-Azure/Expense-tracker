import { useState } from 'react'
import { formatCategory } from './format.js'

const TYPES = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="add-transaction" aria-labelledby="add-heading">
      <h2 id="add-heading">Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="type-toggle">
          <legend className="visually-hidden">Type</legend>
          {TYPES.map(option => (
            <label key={option.value} className={`type-option type-${option.value}`}>
              <input
                type="radio"
                name="type"
                value={option.value}
                checked={type === option.value}
                onChange={(e) => setType(e.target.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="field field-description">
          <label htmlFor="tx-description">Description</label>
          <input
            id="tx-description"
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="tx-amount">Amount</label>
          <div className="amount-input">
            <span aria-hidden="true">$</span>
            <input
              id="tx-amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="tx-category">Category</label>
          <select id="tx-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{formatCategory(cat)}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="add-btn">Add transaction</button>
      </form>
    </section>
  );
}

export default TransactionForm
