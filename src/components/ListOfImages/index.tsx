/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {Dimensions, StyleSheet, View} from 'react-native';
import store from '../../store/store';
import {ImageData} from '../../types/types';
import ScrollableContainer from '../ScrollableContainer';
import TypicalButton from '../Buttons/TypicalButton';

const screen = Dimensions.get('window');

const ListOfImages: React.FC<{navigate: (image: ImageData) => void}> = ({
  navigate,
}) => {
  const [oneColumn, setOneColumn] = useState(true);
  const [isStyleWithMargins, setIsStyleWithMargins] = useState(false);
  const handleImageClick = (image: ImageData) => {
    navigate(image);
  };
  const handleColumnsSwitch = () => {
    setOneColumn(!oneColumn);
  };
  const handleStyleSwitch = () => {
    setIsStyleWithMargins(!isStyleWithMargins);
  };

  return (
    <>
      <View style={styles.switchersContainer}>
        <TypicalButton
          action={handleColumnsSwitch}
          text={oneColumn ? 'В ДВЕ КОЛОНКИ' : 'В ОДНУ КОЛОНКУ'}
          buttonStyles={styles.buttonSwitcher}
          textStyles={styles.switcherText}
        />
        <TypicalButton
          action={handleStyleSwitch}
          text={isStyleWithMargins ? 'С ПРОБЕЛАМИ' : 'МОНОЛИТНЫЙ'}
          buttonStyles={styles.buttonSwitcher}
          textStyles={styles.switcherText}
        />
      </View>
      <ScrollableContainer
        images={store.images}
        imageClick={handleImageClick}
        newContainerStyles={[
          styles.imagesCompound,
          isStyleWithMargins && {paddingBottom: 50},
        ]}
        newImageStyles={[
          isStyleWithMargins
            ? styles.imageContainer
            : styles.imageContainerWithMargins,
          {
            width: oneColumn
              ? '100%'
              : isStyleWithMargins
              ? '50%'
              : (screen.width - 20) / 2,
          },
        ]}
      />
    </>
  );
};

const ListOfImagesObserver = observer(ListOfImages);

const styles = StyleSheet.create({
  switchersContainer: {
    flexDirection: 'row',
  },
  buttonSwitcher: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#00A4FA',
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 15,
    minWidth: (screen.width - 30) / 2 - 30,
  },
  switcherText: {
    color: '#FFF',
    fontSize: 12,
  },
  imagesCompound: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 35,
  },
  imageContainer: {
    height: 200,
  },
  imageContainerWithMargins: {
    height: 180,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ListOfImagesObserver;
