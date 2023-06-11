import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { logOutAsync } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/store';

type JoinRoomProps = {
  navigation: any;
};

const JoinRoom: FC<JoinRoomProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    dispatch(logOutAsync(navigation));
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff' }}>JoinRoom page</Text>
      <TouchableOpacity>
        <Text style={{ color: '#00CDBD' }} onPress={handleLogOut}>
          Log Out
        </Text>
      </TouchableOpacity>

      {/* <div className="fieldsetContainer" style={{ height: '200px' }}>
        <input
          type="text"
          placeholder="Enter room ID"
          onChange={event => {
            setRoom(event.target.value);
          }}
        />
        {errorMessage && <span className="errorMessage">{errorMessage}</span>}
      </div>

      <button onClick={joinRoom}>Join A Room</button>
      <span className="question">
        Don&apos;t have an account?{' '}
        <span className="call" onClick={logOut}>
          Log out!
        </span>
      </span> */}
    </View>
  );
};

export default JoinRoom;
