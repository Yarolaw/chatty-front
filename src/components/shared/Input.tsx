import React, { FC, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { StyledInput, StyledInputWrapper } from '../styled';
import { StyleProp } from 'react-native';

type InputProps = {
  handleChange: (text: string) => void;
  placeholder: string;
  leftIconName?: string;
  password?: boolean;
  value: string;
  inputWrapperStyles?: any;
};

const Input: FC<InputProps> = ({ placeholder, leftIconName, password, value, inputWrapperStyles, handleChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isMaterialIconAvailable = MaterialCommunityIcons.hasIcon(leftIconName!);
  const IconComponent = isMaterialIconAvailable ? MaterialCommunityIcons : FontAwesome;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <StyledInputWrapper style={inputWrapperStyles} isFocused={isFocused}>
      {leftIconName && (
        <IconComponent
          name={leftIconName}
          size={20}
          color={isFocused ? '#00CDBD' : 'gray'}
          style={{ marginHorizontal: 10 }}
        />
      )}

      <StyledInput
        value={value}
        placeholder={placeholder}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={showPassword}
      />
      {password && (
        <Ionicons
          name={showPassword ? 'eye' : 'eye-off'}
          size={20}
          color={isFocused ? '#00CDBD' : 'gray'}
          style={{ marginHorizontal: 10 }}
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        />
      )}
    </StyledInputWrapper>
  );
};

export default Input;
