import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCwAr-dtyAlzieac1bWPbdkTTpGIeLba3w",
    authDomain: "crwn-db-dd0c9.firebaseapp.com",
    projectId: "crwn-db-dd0c9",
    storageBucket: "crwn-db-dd0c9.appspot.com",
    messagingSenderId: "1091953651821",
    appId: "1:1091953651821:web:998353ce58f9b1f7684f64",
    measurementId: "G-YDQ0TTGTZT"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) 
    return;
  else{
      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      if (!snapShot.exists){
          const {displayName, email} = userAuth;
          const createdAt = new Date();
          try{
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
            });
          }catch(error){
            console.log('error creating user', error.message);
          }
      }
      return userRef;
      
  }
}  

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();
    return {
      routeName : encodeURI(title.toLowerCase()),
      id:doc.id,
      items,
      title
    }
  });
  return transformedCollection.reduce( (accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {}

  )
}

export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({prompt:'select_account'}) 

export const signInWithGoogle = () => auth.signInWithPopup(provider)