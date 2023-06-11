import React, { FC } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { signInWithGoogleAsync } from '../redux/slices/authSlice';

import { StyledGoogleButton, StyledJoinContainer } from './styled';
import TitleLogo from '../images/welcome-title.svg';
import GoogleLogo from '../images/google-logo.svg';

type WelcomeContainerProps = {
  children: any;
};

const WelcomeContainer: FC<WelcomeContainerProps> = ({ children }) => {
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const dispatch = useAppDispatch();

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogleAsync());
  };

  return (
    <View style={styles.container}>
      <TitleLogo width={70} height={70} />
      <Text style={styles.titleText}>Welcome to the Stream Chat</Text>
      {children}
      {!currentUser && (
        <TouchableOpacity onPress={handleSignInWithGoogle}>
          <View style={styles.googleButton}>
            <GoogleLogo style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WelcomeContainer;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#070A0D'
  },
  titleText: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 16,
    color: '#ffffff'
  },
  googleIcon: {},
  googleButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 250,
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 12,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 2
  },
  googleButtonText: {
    fontWeight: '600',
    alignSelf: 'center',
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 5,
    color: '#000'
  }
});
