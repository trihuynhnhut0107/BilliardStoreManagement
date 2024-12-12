function isValidPhoneNumber(phone) {
  const phoneRegex = /^0\d{9,10}$/; // Matches 0 followed by 9 or 10 digits
  return phoneRegex.test(phone);
}
module.exports = isValidPhoneNumber;
