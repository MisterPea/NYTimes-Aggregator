/* eslint-disable require-jsdoc */
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
async function getUserInfo(callback) {
  const userPromiseArray = [];
  try {
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
  } catch (err) {
    console.error(err);
  }

  const result = [];
  userPromiseArray.map((userPromise) => {
    Promise.all(userPromise)
        .then((userData)=> {
          result.push({
            active: userData[0],
            selections: userData[1],
            email: userData[2],
          });
        })
        .then(() => {
          if (result.length === userPromiseArray.length) {
            callback(result);
          }
        })
        .catch((err) => {
          console.error(err);
        });
  });
}


/**
 * Method to get all unique selections - only if active is true.
 * @param {Array.<Object>} userInfo Array of Objects derived from getUserInfo()
 * @return {Promise<array>} Returns an array of unique selections
 */
function getUniqueSelections(userInfo) {
  const selectionsSet = new Set();
  for (const user of userInfo) {
    const {selections} = user;
    selections.forEach(selectionsSet.add, selectionsSet);
  }
  return Promise.resolve(Array.from(selectionsSet));
}
module.exports = {getUserInfo, getUniqueSelections};
