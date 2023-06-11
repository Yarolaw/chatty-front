import React from 'react';
import { Action } from 'redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationProp } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { generateErrorMessage } from '../helpers/helpers';
import {
  setCurrentUser,
  setUserData,
  setInitialLoading,
  setLoading,
  setError,
  clearError,
  UserDataType
} from '../redux/slices/authSlice';

GoogleSignin.configure({
  webClientId: '961063246765-5b0tvi1139qs8lsleffg4ss52f5eue60.apps.googleusercontent.com'
});

export const signInWithGoogle = async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(clearError());

  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

    const res = await auth().signInWithCredential(googleCredential);
    console.log('signInWithGoogleRes: ', res);
  } catch (error: any) {
    dispatch(setError(error.message));
    console.log('error: ', error);
  }
  dispatch(setLoading(false));
};

export const signUp = async (dispatch: (action: Action) => void, userData: UserDataType): Promise<void> => {
  if (userData.name) {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      if (userData.email && userData.password) {
        const result = await auth().createUserWithEmailAndPassword(userData.email!, userData.password!);

        await auth().currentUser?.updateProfile({
          displayName: userData.name
        });
        console.log('CreatedUser:', result.user);

        const usersRef = firestore().doc(`users/${result.user.uid}`);
        await usersRef.set({
          name: userData.name,
          email: userData.email,
          online: ''
        });
      } else {
        dispatch(setError('Invalid email or password'));
      }
    } catch (error: any) {
      dispatch(setError(generateErrorMessage(error.code) || ''));
      console.log('signUpError:', error);
    }
    dispatch(setLoading(false));
  } else {
    dispatch(setError('Missing the name'));
  }
};

export const signIn = async (dispatch: (action: Action) => void, userData: UserDataType): Promise<void> => {
  dispatch(setLoading(true));
  dispatch(clearError());

  try {
    if (userData.email && userData.password) {
      const userCredential = await auth().signInWithEmailAndPassword(userData.email, userData.password);
      const user = userCredential.user;
      console.log('SignInUser:', user);
    } else {
      dispatch(setError('Invalid email or password'));
    }
  } catch (error: any) {
    dispatch(setError(generateErrorMessage(error.code) || ''));
    console.log('signInError :', error.code);
  }

  dispatch(setLoading(false));
};

export const logOut = async (dispatch: (action: Action) => void, navigation: NavigationProp<any>) => {
  dispatch(clearError());
  await auth().signOut();
  navigation.navigate('SignIn');
};

// export const joinRoom = () => {
//   if (room !== '') {
//     socket.emit('join_room', room);
//     navigate('/chat');
//   } else {
//     setErrorMessage('Missing the room number');
//   }
// };

// const resetPassword = async () => {
//   setLoading(true);
//   try {
//     await sendPasswordResetEmail(auth, userData.email);
//     setErrorMessage('');
//     navigate('/reset-password-success');
//   } catch (e) {
//     setErrorMessage(generateErrorMessage(e.code));
//     console.log('resetPasswordError :', e.code);
//   }
//   setLoading(false);
// };

// const deleteUser = async () => {
//   setLoading(true);
//   try {
//     await auth.currentUser.delete();
//     setErrorMessage('');
//     navigate('/login');
//   } catch (e) {
//     setErrorMessage(generateErrorMessage(e.code));
//     console.log('deleteUserError :', e.code);
//   }
//   setLoading(false);
// };
