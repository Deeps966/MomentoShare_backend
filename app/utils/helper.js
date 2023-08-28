const isValidEmail = (value) => {
  // Validate the email using Regex
  return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
}

const isValidEmailDomain = (value) => {
  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'hotmail.com', 'live.com']; // Add more allowed domains as needed

  const emailParts = value.split('@');
  const domain = emailParts[emailParts.length - 1];

  return allowedDomains.includes(domain.toLowerCase());
};

const isValidPhoneNumber = function (value) {
  // Custom validator to check that the mobile number is a 10-digit number
  return /^[0-9]{10}$/.test(value.toString());
}

const isValidBase64 = (value) => {
  // Custom validator to check Base64 encoding
  return /^data:image\/(jpeg|png|gif);base64,/.test(value);
}

module.exports = {
  isValidEmail,
  isValidEmailDomain,
  isValidPhoneNumber,
  isValidBase64
}