import React, { FC } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../scss/variables';

type AccountQuestionProps = {
  handlePress: () => void;
  call: string;
  question: string;
};

const AccountQuestion: FC<AccountQuestionProps> = ({ handlePress, call, question }) => {
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Text style={styles.question}>
        {question}
        {'   '}
        <Text style={styles.call}>{call}</Text>
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AccountQuestion;

const styles = StyleSheet.create({
  question: {
    fontSize: 14,
    marginVertical: 10,
    color: '#7a7a7a'
  },
  call: {
    color: Colors.greenPrimary
  }
});
