/**
 * Checking method for name, email and password; collectively checks all three as a unit.
 * Valid password: 8 Characters with 1 Capitalized Letter and 1 Number
 * Valid username: Between 3-35 characters including -_& A-Z a-z
 * @param {string} user
 * @param {string} userEmail
 * @param {string} userPassword
 * @returns {boolean}
  */
export function VerifyEmailAndPassword(user = null, userEmail = null, userPassword = null) {
  const eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const pRegex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/;
  const uRegex = /([A-Za-z\-_& ]){3,35}/;

  const email = eRegex.test(userEmail);
  const password = pRegex.test(userPassword);
  const username = uRegex.test(user);

  return {
    // True return = no error : False return = error.
    validEmail: email,
    validPassword: password,
    validUser: username,
    valid: email && password && username,
  };
}

/**
 * Verifies validity of an entered email.
 * @param {string} userEmail
 * @returns {boolean}
 */
export function VerifyEmail(userEmail) {
  const eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = eRegex.test(userEmail);
  return email;
}

/**
 * Verifies the validity of an entered password:
 * 8 Characters with 1 Capitalized Letter and 1 Number.
 * @param {string} userPassword
 * @returns {boolean}
 */
export function VerifyPassword(userPassword){
  const pRegex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/;
  const password = pRegex.test(userPassword)
  return password
}