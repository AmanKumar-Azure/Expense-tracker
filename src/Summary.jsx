import { formatMoney } from './format.js'

// Guilloche: interlaced wave lines like the security print on a cheque.
const GUILLOCHE_WIDTH = 1000;
const GUILLOCHE_HEIGHT = 260;
const guillochePaths = Array.from({ length: 22 }, (_, k) => {
  let d = '';
  for (let x = 0; x <= GUILLOCHE_WIDTH; x += 8) {
    const t = (x / GUILLOCHE_WIDTH) * Math.PI * 2;
    const y =
      GUILLOCHE_HEIGHT / 2 +
      Math.sin(t * 3 + k * 0.3) * 70 * Math.cos(t * 1.5 - k * 0.18) +
      Math.sin(t * 9 + k * 0.6) * 9;
    d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)} `;
  }
  return d;
});

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <svg
        className="guilloche"
        viewBox={`0 0 ${GUILLOCHE_WIDTH} ${GUILLOCHE_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {guillochePaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>

      <p className="balance-label">Balance</p>
      <p className={`balance-figure${balance < 0 ? ' is-negative' : ''}`}>
        {formatMoney(balance)}
      </p>

      <dl className="totals">
        <div>
          <dt>Money in</dt>
          <dd>{formatMoney(totalIncome)}</dd>
        </div>
        <div>
          <dt>Money out</dt>
          <dd>{formatMoney(totalExpenses)}</dd>
        </div>
      </dl>
    </div>
  );
}

export default Summary
