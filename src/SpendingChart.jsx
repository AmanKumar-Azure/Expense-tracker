import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList, ResponsiveContainer } from 'recharts'

const formatMoney = (value) => `$${value.toLocaleString()}`;

function SpendingChart({ transactions }) {
  const totals = {};
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  }

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 24, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="#eee" />
            <XAxis dataKey="category" tick={{ fontSize: 13, fill: "#333" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatMoney} tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} width={60} />
            <Tooltip formatter={(value) => [formatMoney(value), "Spent"]} cursor={{ fill: "#f5f5f5" }} />
            <Bar dataKey="amount" fill="#c62828" maxBarSize={48} radius={[3, 3, 0, 0]}>
              <LabelList dataKey="amount" position="top" formatter={formatMoney} style={{ fontSize: 12, fill: "#333" }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
