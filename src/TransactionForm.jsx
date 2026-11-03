import { useRef, useState } from 'react'
import { formatCategory, todayLocalISO } from './format.js'

const TYPES = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];

// Returns an error message per invalid field; an empty object means the input is valid.
function validate(description, amount) {
  const errors = {};
  if (!description.trim()) {
    errors.description = "Enter a description.";
  }
  if (amount.trim() === "") {
    errors.amount = "Enter an amount.";
  } else {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      errors.amount = "Enter an amount greater than $0.";
    }
  }
  return errors;
}

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState({});
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);

  const clearError = (field) => {
    setErrors(prev => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(description, amount);
    setErrors(newErrors);
    if (newErrors.description) {
      descriptionRef.current.focus();
      return;
    }
    if (newErrors.amount) {
      amountRef.current.focus();
      return;
    }

    const trimmedDescription = description.trim();
    const value = Number(amount);
    onAdd({
      id: crypto.randomUUID(),
      description: trimmedDescription,
      amount: value,
      type,
      category,
      date: todayLocalISO(),
    });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="add-transaction" aria-labelledby="add-heading">
      <h2 id="add-heading">Add a transaction</h2>
      <form onSubmit={handleSubmit} noValidate>
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
            ref={descriptionRef}
            id="tx-description"
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={errors.description ? "tx-description-error" : undefined}
            onChange={(e) => {
              setDescription(e.target.value);
              clearError("description");
            }}
          />
          {errors.description && (
            <p id="tx-description-error" className="field-error">{errors.description}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="tx-amount">Amount</label>
          <div className="amount-input">
            <span aria-hidden="true">$</span>
            <input
              ref={amountRef}
              id="tx-amount"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              aria-invalid={errors.amount ? true : undefined}
              aria-describedby={errors.amount ? "tx-amount-error" : undefined}
              onChange={(e) => {
                setAmount(e.target.value);
                clearError("amount");
              }}
            />
          </div>
          {errors.amount && (
            <p id="tx-amount-error" className="field-error">{errors.amount}</p>
          )}
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
