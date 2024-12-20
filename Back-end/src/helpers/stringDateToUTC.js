function stringToUTCDate(dateString) {
  // Regular expression to validate and capture components in MM/DD/YYYY format
  const regex = /^(\d{2}):(\d{2}):(\d{2}) (\d{2})\/(\d{2})\/(\d{4})$/;

  // Test the input string against the regex
  const match = regex.exec(dateString);
  if (!match) {
    return false; // Return false if the format is invalid
  }

  // Extract time and date components from the regex match
  const [, hours, minutes, seconds, month, day, year] = match.map(Number);

  // Validate the extracted components (ranges of values)
  if (
    hours > 23 ||
    hours < 0 ||
    minutes > 59 ||
    minutes < 0 ||
    seconds > 59 ||
    seconds < 0 ||
    day > 31 ||
    day < 1 ||
    month > 12 ||
    month < 1
  ) {
    return false; // Return false if any component is out of range
  }

  // Create a Date object assuming GMT+7 (manual adjustment)
  const localTime = Date.UTC(year, month - 1, day, hours, minutes, seconds);
  const utcTime = localTime - 7 * 60 * 60 * 1000; // Subtract 7 hours for UTC

  return new Date(utcTime); // Return as a UTC Date object
}
module.exports = stringToUTCDate;
