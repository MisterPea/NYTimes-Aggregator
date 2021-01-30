const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

const usersCollection = db.collection("users");

/**
 * Asynchronous Method to get all user information.
 * @param {func} callback - A function to pass output to.
 * @return {func} callback - Formatted as an Array of Objects.
 * - active: {Bool} Account is currently reciveing email updates.
 * - selections: {Array} selections/subscription keywords
 * - email: {String} Users email
 */
async function getUserSubscriptions(callback) {
  const userPromiseArray = [];

  const users = await usersCollection.get();
  users.forEach((user) => {
    const {active, selections} = user.data();
    const activeP = Promise.resolve(active);
    const selectionsP = Promise.resolve(selections);
    const emailP = auth.getUser(user.id).then((id) => {
      return id.email;
    });
    userPromiseArray.push([activeP, selectionsP, emailP]);
  });

  const result = [];
  for (let i=0; i < userPromiseArray.length; i++) {
    const userPromise = userPromiseArray[i];
    Promise.all(userPromise).then((userData) => {
      result.push({
        active: userData[0],
        selections: userData[1],
        email: userData[2],
      });
      if (i === userPromiseArray.length-1) {
        callback(result);
      }
    });
  }
}

module.exports = {getUserSubscriptions};
