function utcDateToString(date) {
  // Convert UTC to GMT+7
  const localDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  const hours = String(localDate.getHours()).padStart(2, "0");
  const minutes = String(localDate.getMinutes()).padStart(2, "0");
  const seconds = String(localDate.getSeconds()).padStart(2, "0");

  const day = String(localDate.getDate()).padStart(2, "0");
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const year = localDate.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}
module.exports = utcDateToString;
