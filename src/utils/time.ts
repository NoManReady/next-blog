export const dateFormatter = (date: string | Date) => {
  return new Date(date).toLocaleDateString('cn', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};
