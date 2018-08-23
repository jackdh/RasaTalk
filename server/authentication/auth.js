const validator = require('validator');
const passport = require('passport');

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (
    !payload ||
    typeof payload.name !== 'string' ||
    payload.name.trim().length === 0
  ) {
    isFormValid = false;
    errors.name = 'Please provide a name';
  }

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (
    !payload ||
    typeof payload.repeatPassword !== 'string' ||
    payload.repeatPassword.trim().length < 8
  ) {
    isFormValid = false;
    errors.repeatPassword = 'Repeat Password must have at least 8 characters.';
  }

  if (payload.repeatPassword !== payload.password) {
    isFormValid = false;
    errors.password = 'Passwords do not match.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  const ret = {
    success: isFormValid,
    message,
    errors,
  };
  return ret;
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    payload.email.trim().length === 0
  ) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

function signup(req, res, next) {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    const ret = {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    };
    return res.status(400).json(ret);
  }

  return passport.authenticate('local-signup', (err, token, user) => {
    if (err) {
      if (err.message.indexOf('duplicate key error') !== -1) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'This email is already taken.',
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form. The server is likely down.',
      });
    }

    const response = {
      success: true,
      message:
        'You have successfully signed up! Now you should be able to log in.',
      token,
      user,
    };

    return res.status(200).json(response);
  })(req, res, next);
}

function login(req, res, next) {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form. The server is likely down.',
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
}

module.exports = {
  signup,
  login,
};
