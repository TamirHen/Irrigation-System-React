/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import configData from '../config.json';

const { firebaseConfig } = configData;

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const persistence = firebase.auth.Auth.Persistence;
export const firestore = firebase.firestore();

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

export const generateUserDocument = async (user, additionalData) => {
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

export const updateUserDocument = async (user, data) => {
  if (!user) return 'error';
  const { email } = user;
  const userRef = firestore.collection('users').doc(email);
  const userDoc = await userRef.get();
  if (!userDoc.exists) return 'error';

  if (data?.urlCode.slice(-1) === '/') {
    data.urlCode = data.urlCode.slice(0, -1);
  }
  try {
    await userRef.set(
      {
        ...data,
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error: can't update document: ", error);
    return 'error';
  }
  return 'updated';
};
