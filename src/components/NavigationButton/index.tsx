import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {buttonsColor, mainTextColor} from '../../constants/constants';

const NavigationButton: React.FC<{navigateCallback: () => void; text: string}> =
  ({navigateCallback, text}) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={navigateCallback}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  button: {
    backgroundColor: buttonsColor,
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 100,
    borderRadius: 40 / 2,
  },
  buttonText: {
    color: mainTextColor,
    textAlign: 'center',
  },
});

export default NavigationButton;
