function stringToUTCDate(dateString) {
  const [time, date] = dateString.split(" ");
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const [day, month, year] = date.split("/").map(Number);

  // Create a date object in the local timezone
  const localDate = new Date(year, month - 1, day, hours, minutes, seconds);

  // Convert the local timezone (assumed GMT+7) to UTC
  const utcDate = new Date(localDate.getTime() - 7 * 60 * 60 * 1000);

  return utcDate;
}
module.exports = stringToUTCDate;
