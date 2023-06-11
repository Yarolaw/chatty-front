import React, { FC } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

const Loader: FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 56, width: '100%' }}>
      <Spinner isVisible={true} size={40} type={'Wave'} color={'#4fa94d'} />
    </View>
  );
};

export default Loader;
