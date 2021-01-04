/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCmWhdLsNWdcoy5n73aVuX2Wb17Qkw4MKw',
  authDomain: 'smart-irrigation-system-854fa.firebaseapp.com',
  databaseURL: 'https://smart-irrigation-system-854fa.firebaseio.com',
  projectId: 'smart-irrigation-system-854fa',
  storageBucket: 'smart-irrigation-system-854fa.appspot.com',
  messagingSenderId: '175621433547',
  appId: '1:175621433547:web:f80840fa5b9790147cd34e',
  measurementId: 'G-C6JDMHJCFC',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const persistence = firebase.auth.Auth.Persistence;
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  // const firestore = firebase.firestore();
  if (!user) return;
  const { email } = user;
  const userRef = firestore.collection('users').doc(email);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    if (additionalData?.urlCode.slice(-1) === '/') {
      additionalData.urlCode = additionalData.urlCode.slice(0, -1);
    }
    try {
      await userRef.set(
        {
          ...additionalData,
        },
        { merge: true },
      );
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(email);
};

const getUserDocument = async (email) => {
  if (!email) return null;
  try {
    const userDocument = await firestore.collection('users').doc(email).get();
    return {
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
  return 'Could not find document.';
};
