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
      const emailDisplayNameP = auth.getUser(user.id).then((id) => {
        return {email: id.email, displayName: id.displayName};
      });
      userPromiseArray.push([activeP, selectionsP, emailDisplayNameP]);
    });
  } catch (err) {
    console.error(err);
  }

  /**
   * Changed for-loop to map. Seemed like some race condition tied to
   * the for-loop was unevenly executing the callback, leading to
   * to dropped user records.
   */
  const result = [];
  userPromiseArray.map((userPromise) => {
    Promise.all(userPromise)
        .then((userData) => {
          result.push({
            active: userData[0],
            selections: userData[1],
            displayName: userData[2].displayName,
            email: userData[2].email,
          });
        })
        .then(() => {
          if (result.length === userPromiseArray.length) {
            callback(result);
            auth.app.delete();
          }
        })
        .catch((err) => {
          console.error(err);
        });
  });
}

/**
 * Method to remove duplicate selections - only if active is true.
 * @param {Array.<object>} userInfo Array of Objects derived from getUserInfo()
 * @return {Promise<array>} Returns an array of unique selections
 */
function getUniqueSelections(userInfo) {
  const uniqueSel = [...new Set(userInfo.flatMap((user) => user.selections))];
  return Promise.resolve(uniqueSel);
}

/**
 * Method to combine/match the articles subscriptions
 * @param {Array<object>} articles Array of objects containing article(s)
 * @param {Array<object>} users Array of objects of user info
 * @return {Promise<object>} Promise for user info and subscriptions
 */
function packageEmailAndArticles(articles, users) {
  const articleSearch = (term) => {
    return articles.find((article) => article.searchTerm === term) || null;
  };

  for (const user of users) {
    const userArticles = user.selections.map((select) => {
      return articleSearch(select);
    });
    const articleObjects = userArticles.flatMap((entry) => (
      entry != null && entry != undefined ? entry : []));

    if (articleObjects.length > 1) {
      user.searchArticles = removeDuplicateArticles(articleObjects);
    } else {
      user.searchArticles = articleObjects;
    }
  }
  return Promise.resolve(users);
}

/**
 * Greedy, recursive method to remove duplicate objects in a 2D Array.
 * Duplicate objects are defined as having the same web_url
 * @param {Array<object>} articleObjects Array of arrays of objects
 * @return {Array<object>} Returns an array of arrays of objects
 */
function removeDuplicateArticles(articleObjects) {
  const objectLength = articleObjects.length - 1;
  const treeTraverse = (o1, a1, o2, a2) => {
    const nodeOneLength = articleObjects[o1].articles.length - 1;
    const nodeTwoLength = articleObjects[o2].articles.length - 1;

    const nodeOne = articleObjects[o1].articles[a1].web_url;
    const nodeTwo = articleObjects[o2].articles[a2].web_url;
    if (nodeOne === nodeTwo) {
      articleObjects[o2].articles.splice(a2, 1);
      // We see if we're rm from top of the stack, if not, decrement.
      if (a2 != 0) {
        a2 -= 1;
      }
      return treeTraverse(o1, a1, o2, a2);
    }
    if (a2 < nodeTwoLength) {
      a2 += 1;
      return treeTraverse(o1, a1, o2, a2);
    } else if (a1 < nodeOneLength) {
      a1 += 1;
      a2 = 0;
      return treeTraverse(o1, a1, o2, a2);
    } else if (o2 < objectLength) {
      o2 += 1;
      a1 = 0;
      a2 = 0;
      return treeTraverse(o1, a1, o2, a2);
    } else if (o1 < objectLength - 1) {
      o1 += 1;
      o2 = o1 + 1;
      a1 = 0;
      a2 = 0;
      return treeTraverse(o1, a1, o2, a2);
    } else {
      return articleObjects;
    }
  };
  return treeTraverse(0, 0, 1, 0);
}
module.exports = {getUserInfo, getUniqueSelections, packageEmailAndArticles};
