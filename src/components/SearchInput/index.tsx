import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const SearchInput: React.FC<{
  textHandler: (text: string) => void;
  inputValue: string;
}> = ({textHandler, inputValue}) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={textHandler}
      value={inputValue}
      placeholder='Используйте английскую раскладку'
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: '100%',
    width: '85%',
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default SearchInput;
