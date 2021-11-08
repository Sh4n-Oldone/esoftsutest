import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParams';
import {
  buttonsColor,
  mainBackgroundColor,
  mainTextColor,
} from '../../constants/constants';
import PinchableImage from '../../components/PinchableImage';
import {ImageData} from '../../types/types';
import NavigationButton from '../../components/Buttons/NavigationButton';
import TypicalButton from '../../components/Buttons/TypicalButton';

type detailsScreenProp = StackNavigationProp<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<{route: {params: ImageData}}> = ({route}) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const {id, url, urlBiggest, description, created, author, tags} =
    route.params;
  const unProxyTags = [...tags];
  const navigation = useNavigation<detailsScreenProp>();
  const handleTagClick = (tag: string) => {
    navigation.navigate('Search', {tag});
  };
  const handleNavigation = () => {
    navigation.navigate('Main');
  };
  const handleImageClick = () => {
    setIsImageFullScreen(!isImageFullScreen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleImageClick}
        style={styles.imageContainer}>
        <Image source={{uri: url}} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.descriptionContainer}>
        <Text style={styles.text}>{`Описание: ${description}`}</Text>
        <Text style={styles.text}>{`Автор: ${author}`}</Text>
        <Text style={styles.text}>{`Дата поста: ${created}`}</Text>
      </View>
      <View style={styles.tagsContainer}>
        {unProxyTags.length > 0 ? (
          unProxyTags.map((tag: string, index: number) => (
            <TypicalButton
              key={`${id}${tag}`}
              action={() => handleTagClick(tag)}
              text={tag}
              buttonStyles={[
                styles.tagBorderBox,
                index === unProxyTags.length - 1 && {marginRight: 0},
              ]}
              textStyles={styles.text}
            />
          ))
        ) : (
          <Text style={styles.text}>Пользователь не указал теги 😔</Text>
        )}
      </View>
      {isImageFullScreen && (
        <PinchableImage url={urlBiggest} handleClose={handleImageClick} />
      )}
      {!isImageFullScreen && (
        <NavigationButton
          navigateCallback={handleNavigation}
          text={'НА ГЛАВНУЮ'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: mainBackgroundColor,
  },
  imageContainer: {
    height: '50%',
    width: '100%',
    marginBottom: 15,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  descriptionContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  text: {
    color: mainTextColor,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  tagBorderBox: {
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    backgroundColor: buttonsColor,
  },
});

export default DetailsScreen;
