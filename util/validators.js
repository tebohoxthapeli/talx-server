const returnedObject = (errors) => {
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateEmail = (email) => {
  if (!email.trim()) return "Enter an email address";

  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

  if (!email.match(regEx)) return "Enter a valid email address";
  return;
};

const validateRegisterInput = (username, email, password, confirm_password) => {
  const errors = {};

  if (!username.trim()) errors.username = "Enter a username";

  const resultValidateEmail = validateEmail(email);
  if (resultValidateEmail) errors.email = resultValidateEmail;

  if (!password) errors.password = "Enter a password";
  else if (password !== confirm_password) {
    errors.confirm_password = "Enter matching passwords";
  }

  return returnedObject(errors);
};

const validateLoginInput = (username, password) => {
  const errors = {};

  if (!username.trim()) errors.username = "Enter a username";
  if (!password) errors.password = "Enter a password";

  return returnedObject(errors);
};

const validateEditUser = (username, email) => {
  const errors = {};
  const resultValidateEmail = validateEmail(email);

  if (!username.trim()) errors.username = "Enter a username";
  if (resultValidateEmail) errors.email = resultValidateEmail;

  return returnedObject(errors);
};

module.exports = {
  validateLoginInput,
  validateRegisterInput,
  validateEditUser,
};
