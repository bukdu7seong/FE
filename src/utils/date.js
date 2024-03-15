export function changeDateFormat(date) {
  const newDate = new Date(date);

  const timeStr = newDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateStr = newDate.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
  });

  const newDateFormat = `${timeStr} ${dateStr}`;
  return newDateFormat;
}
