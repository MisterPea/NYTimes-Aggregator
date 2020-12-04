import firebase from "./Auth";
const db = firebase.firestore();
const userCollection = db.collection("users");

/**
 * InitUser: Creates a space on the database tied to the User Id (uid)
 * @param {string} uid
 * @returns {promise}
 */
export function InitUser(uid) {
  return new Promise((resolve, reject) => {
    userCollection.doc(uid).set({
        active: true,
        selections: [],
      })
      .then(() => {
        resolve("Account created");
      })
      .catch((error) => {
        reject(`Something went wrong: ${error}`);
      });
  });
}

/**
 * Adds, and removes subscription topics.
 * @param {string} uid
 * @param {Array<string>} selection
 * @returns {promise} 
 */
export function AddToUser(uid, selection) {
  return new Promise((resolve, reject) => {
    userCollection.doc(uid).update({
       selections: selection
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(`Error adding ${selection}: ${error}`);
      });
  });
}

/**
 * Gets current subscription as an array
 * @param {string} uid
 * @returns {promise<Array>}
 */
export function GetCurrentSubscriptions(uid) {
  return new Promise((resolve, reject) => {
    userCollection.doc(uid).get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data().selections);
        } else {
          reject("doc doesn't exist");
        }
      })
      .catch((error) => {
        reject(`Error getting current subscriptions. Code:${error}`);
      });
  });
}
