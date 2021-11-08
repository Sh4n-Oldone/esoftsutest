import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import store from '../../store/store';
import {ScrollView} from 'react-native-gesture-handler';
import {ImageData} from '../../types/types';

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
        <TouchableOpacity
          onPress={handleColumnsSwitch}
          style={styles.buttonSwitcher}>
          <Text style={styles.switcherText}>
            {oneColumn ? 'В ДВЕ КОЛОНКИ' : 'В ОДНУ КОЛОНКУ'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleStyleSwitch}
          style={styles.buttonSwitcher}>
          <Text style={styles.switcherText}>
            {isStyleWithMargins ? 'С ПРОБЕЛАМИ' : 'МОНОЛИТНЫЙ'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.imagesScrollableBox}>
        <View
          style={[
            styles.imagesCompound,
            isStyleWithMargins && {paddingBottom: 50},
          ]}>
          {store.images.map(image => (
            <TouchableOpacity
              key={image.id}
              style={[
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
              onPress={() => handleImageClick(image)}>
              <Image
                key={image.id}
                source={{uri: image.url}}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  imagesScrollableBox: {
    width: '100%',
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
