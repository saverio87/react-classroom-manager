export const getDateFromObject = (timestamp) => {
  let date = new Date(timestamp);
  return date.toDateString();
};
