import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer } from 'recharts'
import { formatCategory, formatMoney, formatMoneyWhole } from './format.js'

const INK = "#17243F";
const DEBIT = "#A8323A";
const ROW_HEIGHT = 40;

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
    <section className="spending-chart" aria-labelledby="chart-heading">
      <h2 id="chart-heading">Spending by category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">Add an expense to see where your money goes.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * ROW_HEIGHT + 8}>
          <BarChart layout="vertical" data={data} margin={{ top: 4, right: 64, bottom: 4, left: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="category"
              tickFormatter={formatCategory}
              tick={{ fontSize: 14, fill: INK }}
              axisLine={false}
              tickLine={false}
              width={104}
            />
            <Tooltip
              formatter={(value) => [formatMoney(value), "Spent"]}
              labelFormatter={formatCategory}
              cursor={{ fill: "rgba(23, 36, 63, 0.05)" }}
              contentStyle={{ borderRadius: 8, border: "1px solid #C6D2CD", fontSize: 13 }}
            />
            <Bar dataKey="amount" fill={DEBIT} barSize={12} radius={[0, 6, 6, 0]} isAnimationActive={false}>
              <LabelList
                dataKey="amount"
                position="right"
                formatter={formatMoneyWhole}
                style={{ fontSize: 13, fill: INK }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default SpendingChart
