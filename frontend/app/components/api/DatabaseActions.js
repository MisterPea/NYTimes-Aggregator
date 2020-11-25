import firebase from './Auth'

const db = firebase.firestore()

export function AddToUser(uid,selection){
    db.collection("users").doc(uid).set({selections:selection})
    .then(()=>{
        console.log(`${selection} added with ID:`)
    })
    .catch((error)=> {
        console.error(`Error adding ${selection} to ${uid}: ${error}`)
    })
}