export default function VerifyEmailAndPassword(username, email, password) {
  // valid password: 8 Characters with 1 Capitalized Letter and 1 Number
  // valid username: Between 3-35 characters including -_& A-Z a-z
  const eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const pRegex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/;
  const uRegex = /([A-Za-z\-_& ]){3,35}/;

  const validation = {
    email: eRegex.test(email),
    password: pRegex.test(password),
    username: uRegex.test(username),
  };
  console.log(validation.email, validation.password, validation.username)
  return validation.email && validation.password && validation.username
  // Breakout validation on the create account end. 
}
