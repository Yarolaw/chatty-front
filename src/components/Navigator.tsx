import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAppSelector } from '../redux/store';

import SignUp from './SignUp';
import SignIn from './SignIn';
import JoinRoom from './JoinRoom';

const Stack = createStackNavigator();

const Navigator: FC = () => {
  const navigation = useNavigation();
  const currentUser = useAppSelector(state => state.auth.currentUser);
  console.log('currentUser: ', currentUser);

  const [room, setRoom] = useState<string>('');

  const navbarOptions = {
    headerTitle: '',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#181A20',
      elevation: 0
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigation.navigate('Join');
    } else {
      navigation.navigate('SignIn');
    }
  }, [currentUser]);

  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} options={navbarOptions} />
      <Stack.Screen name="SignUp" component={SignUp} options={navbarOptions} />
      <Stack.Screen name="Join" component={JoinRoom} />
      {/* <Stack.Screen name="Chat" component={Chat} initialParams={{ socket, username: userData.name, room }} /> */}
    </Stack.Navigator>
  );
};

export default Navigator;
