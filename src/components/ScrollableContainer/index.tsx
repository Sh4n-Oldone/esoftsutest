import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImageData} from '../../types/types';

const ScrollableContainer: React.FC<{
  componentWidth?: string;
  images: ImageData[];
  imageClick: (image: ImageData) => void;
  newContainerStyles?: {}[];
  newImageStyles?: {}[];
}> = ({
  componentWidth,
  images,
  imageClick,
  newContainerStyles,
  newImageStyles,
}) => {
  return (
    <ScrollView style={{width: componentWidth || '100%'}}>
      <View style={newContainerStyles || [styles.imagesContainer]}>
        {images.map((image, index: number) => (
          <TouchableOpacity
            key={image.id}
            style={
              newImageStyles || [
                styles.imageContainer,
                index === images.length - 1 && {marginBottom: 0},
              ]
            }
            onPress={() => imageClick(image)}>
            <Image
              key={image.id}
              source={{uri: image.url}}
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    paddingBottom: 46,
  },
  imageContainer: {
    height: 400,
    marginBottom: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ScrollableContainer;
