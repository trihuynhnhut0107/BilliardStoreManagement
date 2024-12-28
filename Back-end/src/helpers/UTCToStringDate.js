function convertUTCToGMT7String(utcString) {
  const utcDate = new Date(utcString);

  // Adjust to GMT+7 by adding 7 hours to the UTC time
  const gmt7Date = new Date(utcDate.getTime()); // Add 7 hours

  // Extract time and date components
  const hours = String(gmt7Date.getHours()).padStart(2, "0");
  const minutes = String(gmt7Date.getMinutes()).padStart(2, "0");
  const seconds = String(gmt7Date.getSeconds()).padStart(2, "0");
  const month = String(gmt7Date.getMonth() + 1).padStart(2, "0");
  const day = String(gmt7Date.getDate()).padStart(2, "0");
  const year = gmt7Date.getFullYear();

  // Return the formatted string
  return `${hours}:${minutes}:${seconds} ${month}/${day}/${year}`;
}

module.exports = convertUTCToGMT7String;
