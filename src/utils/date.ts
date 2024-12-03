export const getTimeDifference = (date: string) => {
  const now = new Date();
  const targetDate = new Date(date);
  const differenceInMilliseconds = now - targetDate;

  const sec = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const months = targetDate.toLocaleString("default", { month: "long" });

  if (minutes == 0) {
    return "A l'instant";
  } else if (minutes < 60) {
    return `${minutes}mn`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}j`;
  } else if (days < 365) {
    return `${targetDate.getDate()} ${months.slice(0, 3)}`;
  } else {
    return `${targetDate.getDate()} ${months} ${targetDate.getFullYear()}`;
  }
};
