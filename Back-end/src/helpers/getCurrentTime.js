const getCurrentTime = () => {
  // Get the current date and time in the desired timezone
  const options = {
    timeZone: "Asia/Bangkok",
    hour12: false,
  };

  // Format the date as a string with timezone offset
  const currentTimeString = new Intl.DateTimeFormat("en-US", {
    ...options,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  // Convert the formatted string back to a Date object
  const currentTime = new Date(currentTimeString);

  return currentTime;
};

module.exports = getCurrentTime;
