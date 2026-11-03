const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const currencyWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const formatMoney = (value) => currency.format(value);

export const formatMoneyWhole = (value) => currencyWhole.format(value);

export const formatCategory = (category) =>
  category.charAt(0).toUpperCase() + category.slice(1);

// Today's date as YYYY-MM-DD in the user's local time zone (toISOString() would give UTC).
export const todayLocalISO = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

// Parse YYYY-MM-DD as a local date so it isn't shifted by the time zone.
export const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
