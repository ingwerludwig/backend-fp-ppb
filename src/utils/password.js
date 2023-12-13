const PasswordValidator = require("password-validator");

//validate password user schema using password-validator package
const validatePassword = (userEmail, showDetails) => {
  const schema = new PasswordValidator();
  schema
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces();

  if (showDetails) {
    return schema.validate(userEmail, { details: true });
  } else {
    return schema.validate(userEmail);
  }
};

module.exports = {
  validatePassword,
};
