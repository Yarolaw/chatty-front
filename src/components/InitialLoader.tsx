import React, { FC } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

const InitialLoader: FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner isVisible={true} size={80} type={'9CubeGrid'} color={'#4fa94d'} />
    </View>
  );
};

export default InitialLoader;
