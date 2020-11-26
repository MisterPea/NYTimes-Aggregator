// valid password: 8 Characters with 1 Capitalized Letter and 1 Number
// valid username: Between 3-35 characters including -_& A-Z a-z

export default function VerifyEmailAndPassword(user, userEmail, userPassword) {
  const eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const pRegex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/;
  const uRegex = /([A-Za-z\-_& ]){3,35}/;

  const email = eRegex.test(userEmail)
  const password = pRegex.test(userPassword)
  const username = uRegex.test(user)

  return {
    // True return = no error : False return = error.
    validEmail: email,
    validPassword: password,
    validUser: username,
    valid: email && password && username,
  };
}
