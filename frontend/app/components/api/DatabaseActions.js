/* 
InitUser: Creates a space on the database tied to the User Id (uid)
This method takes in a uid and returns a Promise.

AddToUser: ****** need to change to array methods
*/

import firebase from "./Auth";
const db = firebase.firestore();
const userCollection = db.collection("users");

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

export function AddToUser(uid, selection) {
  userCollection.doc(uid).set({ selections: selection })
    .then(() => {
      console.log(`${selection} added with ID:`);
    })
    .catch((error) => {
      console.error(`Error adding ${selection} to ${uid}: ${error}`);
    });
}

export function GetCurrentSubscriptions(uid) {
  return new Promise((resolve, reject) => {
    userCollection.doc(uid).get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data().selections)
        } else {
          reject("doc doesn't exist")
        }
      })
      .catch((error) => {
        reject(`Error getting current subscriptions. Code:${error}`)
      })
  });
}
