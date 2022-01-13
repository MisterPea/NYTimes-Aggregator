import firebase from './Auth';

const db = firebase.firestore();
const userCollection = db.collection('users');

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
        resolve('Account created');
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
 * @return {promise}
 */
export function AddToUser(uid, selection) {
  return new Promise((resolve, reject) => {
    userCollection.doc(uid).update({
      selections: selection,
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
 * Retrieves current subscription from Firestore.
 * @param {string} uid
 * @return {Promise}
 */
export function GetCurrentSubscriptions(uid) {
  return new Promise((resolve, reject) => {
    userCollection.doc(uid).get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data().selections.sort());
        } else {
          reject("doc doesn't exist");
        }
      })
      .catch((error) => {
        reject(`Error getting current subscriptions. Code:${error}`);
      });
  });
}

/**
 * Retrieves current active status from Firestore.
 * Active status is refereing to whether a subscritption is paused.
 * @param {string} uid
 * @return {Promise}
 */
export function GetActiveStatus(uid) {
  return new Promise((resolve, reject) => {
    userCollection.doc(uid).get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data().active);
        } else {
          reject("doc doesn't exist");
        }
      })
      .catch((error) => {
        reject(`Error getting current active status. Code:${error}`);
      });
  });
}

/**
 * Sets Active status - Whether subscription is paused or not.
 * @param {string} uid
 * @param {boolean} activeOrPaused
 * @returns {Promise}
  */
export function SetActiveStatus(uid, activeOrPaused) {
  return new Promise((resolve, reject) => {
    userCollection.doc(uid).update({
      active: activeOrPaused,
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(`Error updating active status: ${error}`);
      });
  });
}
