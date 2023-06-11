import { Colors } from '../../scss/variables';
import styled from 'styled-components/native';

export const StyledTitleWrapper = styled.View`
  align-self: flex-start;
  margin-bottom: 20px;
`;

export const StyledTitle = styled.Text`
  color: #fff;
  font-size: 35px;
  font-weight: 500;
  text-align: left;
`;

export const StyledButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #11b1a5;
  border-radius: 40px;
  elevation: 8;
`;

export const StyledButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export const StyledLineContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const StyledLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #35383f;
`;

export const StyledLineText = styled.Text`
  font-size: 16px;
  margin: 0 10px;
  color: black;
`;

export const StyledSocialLinkContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 0 20px;
`;

export const StyledSocialLink = styled.View`
  width: 60px;
  height: 50px;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
  border: solid 1px #35383f;
  border-radius: 15px;
  background-color: #1f222a;
`;

export const StyledInputWrapper = styled.View`
  width: 100%;
  height: 52px;
  padding: 0 10px;
  margin: 5px 0;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${props => (props.isFocused ? '#00CDBD' : 'transparent')};
  background-color: #1f222a;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  height: 40px;
  border-width: 0;
`;

// ==================================================================================================

export const StyledErrorMessage = styled.Text`
  width: 290px;
  padding: 5px 12px;
  border: 3px solid rgb(227, 14, 14);
  color: rgb(227, 14, 14);
`;
