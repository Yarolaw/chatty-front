import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { doc, getDoc } from 'firebase/firestore';
import { io } from 'socket.io-client';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useAppDispatch, useAppSelector } from './src/redux/store';
import { setCurrentUser, setInitialLoading, setUserData } from './src/redux/slices/authSlice';

import Navigator from './src/components/Navigator';
import InitialLoader from './src/components/InitialLoader';

// const socket = io.connect(process.env.REACT_APP_SERVER_HOST || "http://localhost:3001");
const socket = io('http://localhost:3001');

const App = () => {
  const userData = useAppSelector(state => state.auth.userData);
  const initialLoading = useAppSelector(state => state.auth.initialLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInitialLoading(true));

    const unsubscribe = auth().onAuthStateChanged(async user => {
      console.log('user', user);
      if (user && user.displayName) {
        console.log('user.displayName: ', user.displayName);
        dispatch(setCurrentUser(user));
        dispatch(setUserData({ ...userData, name: user.displayName }));

        setTimeout(() => {
          dispatch(setInitialLoading(false));
        }, 2000);

        const userRef = firestore().doc(`users/${user.uid}`);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          console.log(`User with id ${user.uid} exists`);

          setTimeout(() => {
            socket.emit('update_status', user.uid);
          }, 1000);
        } else {
          console.log(`User with id ${user.uid} does not exist`);
        }

        socket.emit('update_status', user.uid);
      } else {
        setTimeout(() => {
          dispatch(setInitialLoading(false));
        }, 4000);
      }
    });

    return () => {
      unsubscribe();
      socket.off('update_status');
    };
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>{initialLoading ? <InitialLoader /> : <Navigator />}</View>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A0D',
    fontFamily: 'Open Sans'
  }
});
