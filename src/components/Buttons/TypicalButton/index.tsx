import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const TypicalButton: React.FC<{
  action: () => void;
  text: string;
  buttonStyles?: {} | {}[];
  textStyles?: {} | {}[];
}> = ({action, text, buttonStyles, textStyles}) => {
  return (
    <TouchableOpacity onPress={action} style={buttonStyles || styles.button}>
      <Text style={textStyles || styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#515ee9',
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 100,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default TypicalButton;
