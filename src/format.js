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

// Parse YYYY-MM-DD as a local date so it isn't shifted by the time zone.
export const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
