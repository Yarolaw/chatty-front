import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { UserDataType, clearError, setUserData, signInAsync, signInWithGoogleAsync } from '../redux/slices/authSlice';

import Input from './shared/Input';
import Loader from './Loader';
import AccountQuestion from './AccountQuestion';

import AppleIcon from '../images/apple-logo.svg';
import FacebookIcon from '../images/facebook-logo.svg';
import GoogleIcon from '../images/google-logo.svg';
import {
  StyledButton,
  StyledButtonContainer,
  StyledButtonText,
  StyledLine,
  StyledLineContainer,
  StyledLineText,
  StyledSocialLink,
  StyledSocialLinkContainer,
  StyledTitle,
  StyledTitleWrapper
} from './styled';

type SignInProps = {
  navigation: any;
};

export const SignIn: FC<SignInProps> = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState<UserDataType>({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  const currentUser = useAppSelector(state => state.auth.currentUser);
  const errorMessage = useAppSelector(state => state.auth.error);
  const loading = useAppSelector(state => state.auth.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const emailValue = await AsyncStorage.getItem('email');
      const passwordValue = await AsyncStorage.getItem('password');

      if (emailValue && passwordValue) {
        setRememberMe(true);
        setUserInfo({ ...userInfo, email: emailValue });
        setUserInfo({ ...userInfo, password: passwordValue });
      }
    }

    fetchData();
  }, []);

  const handleRememberMeCheckboxChange = async () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);

    if (!newValue) {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    }
  };

  const handleSubmit = async () => {
    await dispatch(setUserData(userInfo));
    dispatch(signInAsync(userInfo));
  };

  const handleGoogleSignIn = async () => {
    dispatch(signInWithGoogleAsync());
  };

  const handleChangeEmail = async (text: string) => {
    setUserInfo({ ...userInfo, email: text });

    if (rememberMe) {
      await AsyncStorage.setItem('email', text);
    }
  };
  const handleChangePassword = async (text: string) => {
    setUserInfo({ ...userInfo, password: text });

    if (rememberMe) {
      await AsyncStorage.setItem('password', text);
    }
  };
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} style={styles.container}>
      <StyledTitleWrapper>
        <StyledTitle>Login to your Account</StyledTitle>
      </StyledTitleWrapper>

      <View style={styles.inputsWrapper}>
        <Input
          inputWrapperStyles={{ marginBottom: 10 }}
          value={userInfo.email!}
          placeholder="Email"
          leftIconName="email"
          handleChange={handleChangeEmail}
        />
        <Input
          inputWrapperStyles={{ marginBottom: 10 }}
          value={userInfo.password!}
          password
          placeholder="Password"
          leftIconName="lock"
          handleChange={handleChangePassword}
        />
        {errorMessage && !currentUser && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{errorMessage}</Text>
          </View>
        )}
      </View>

      {!errorMessage && (
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={handleRememberMeCheckboxChange}
            tintColors={{ true: '#00CDBD', false: 'black' }}
          />
          <Text style={styles.checkboxText}>Remember me</Text>
        </View>
      )}

      <StyledButtonContainer style={{ marginVertical: 10 }}>
        {loading ? (
          <Loader />
        ) : (
          <StyledButton onPress={handleSubmit}>
            <StyledButtonText>Sign In</StyledButtonText>
          </StyledButton>
        )}
      </StyledButtonContainer>

      <Text style={styles.forgotPassword}>Forgot the password?</Text>

      <StyledLineContainer>
        <StyledLine />
        <StyledLineText>or continue with</StyledLineText>
        <StyledLine />
      </StyledLineContainer>

      <StyledSocialLinkContainer>
        <StyledSocialLink>
          <FacebookIcon />
        </StyledSocialLink>

        <TouchableOpacity onPress={handleGoogleSignIn}>
          <StyledSocialLink>
            <GoogleIcon />
          </StyledSocialLink>
        </TouchableOpacity>

        <StyledSocialLink>
          <AppleIcon />
        </StyledSocialLink>
      </StyledSocialLinkContainer>

      <AccountQuestion
        handlePress={() => {
          dispatch(clearError());
          navigation.navigate('SignUp');
        }}
        call={'Sign Up'}
        question={`Don't have an account?`}
      />
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#181A20'
  },
  inputsWrapper: {
    marginBottom: 15
  },
  forgotPassword: {
    color: '#00CDBD'
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  checkboxText: {
    color: '#fff'
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  error: {
    paddingVertical: 5,
    color: 'rgb(227, 14, 14)'
  }
});
