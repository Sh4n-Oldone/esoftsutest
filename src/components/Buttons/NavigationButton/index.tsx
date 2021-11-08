import React from 'react';
import {StyleSheet, View} from 'react-native';
import {buttonsColor, mainTextColor} from '../../../constants/constants';
import TypicalButton from '../TypicalButton';

const NavigationButton: React.FC<{navigateCallback: () => void; text: string}> =
  ({navigateCallback, text}) => {
    return (
      <View style={styles.container}>
        <TypicalButton
          action={navigateCallback}
          text={text}
          buttonStyles={styles.button}
          textStyles={styles.buttonText}
        />
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
