import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {
  buttonsColor,
  mainBackgroundColor,
  mainTextColor,
} from '../../constants/constants';
import TypicalButton from '../Buttons/TypicalButton';

const screen = Dimensions.get('window');

const PinchableImage: React.FC<{url: string; handleClose: () => void}> = ({
  url,
  handleClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoading = () => {
    setIsLoading(!isLoading);
  };

  // pinch image logic
  const scale = new Animated.Value(1);
  const onPinch = Animated.event([{nativeEvent: {scale}}], {
    useNativeDriver: true,
  });
  const onPinchChange = (event: {nativeEvent: {oldState: number}}) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 1,
      }).start();
    }
  };

  return (
    <View style={styles.pinchBox}>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#00659C" />
        </View>
      )}
      <PinchGestureHandler
        onGestureEvent={onPinch}
        onHandlerStateChange={onPinchChange}>
        <Animated.Image
          source={{uri: url}}
          style={[styles.fullScreenImage, {transform: [{scale}]}]}
          resizeMode="contain"
          onLoadEnd={handleLoading}
        />
      </PinchGestureHandler>
      <TypicalButton
        action={handleClose}
        text={'ЗАКРЫТЬ'}
        buttonStyles={styles.backButton}
        textStyles={styles.backButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pinchBox: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainBackgroundColor,
    height: '100%',
    width: '100%',
  },
  loaderContainer: {
    position: 'absolute',
    elevation: 2,
    zIndex: 2,
  },
  fullScreenImage: {
    width: screen.width,
    height: screen.height,
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: buttonsColor,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: mainTextColor,
  },
});

export default PinchableImage;
