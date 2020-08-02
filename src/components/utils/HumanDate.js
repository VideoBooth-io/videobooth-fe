const humanDate = (date) => new Date(
  Date.parse(date),
)
  .toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export default humanDate;
