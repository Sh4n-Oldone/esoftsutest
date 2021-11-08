import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const TypicalButton: React.FC<{
  action: () => void;
  text: string;
  buttonStyles: {} | {}[];
  textStyles: {} | {}[];
}> = ({action, text, buttonStyles, textStyles}) => {
  return (
    <TouchableOpacity onPress={action} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TypicalButton;
