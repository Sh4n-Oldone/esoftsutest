import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParams';
import {
  buttonsColor,
  localImages,
  mainBackgroundColor,
  mainTextColor,
} from '../../constants/constants';
import NavigationButton from '../../components/NavigationButton';
import {getSearchedImages} from '../../services/imagesAPI';
import {ImageData, ImageFullData} from '../../types/types';
import store from '../../store/store';
import {storeData} from '../../tools/localStorage';

type searchScreenProp = StackNavigationProp<RootStackParamList, 'Search'>;

const SearchScreen: React.FC<{route: {params: {tag: string}}}> = ({route}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagesArray, setImagesArray] = useState<ImageData[] | []>([]);
  const [isRequestDied, setIsRequestDied] = useState('');

  const navigation = useNavigation<searchScreenProp>();

  const handleNavigation = () => {
    navigation.navigate('Main');
  };

  const handleImageClick = (image: ImageData) => {
    navigation.navigate('Details', image);
  };

  const handleSearch = (searchText: string) => {
    Keyboard.dismiss();
    setInputText('');
    setIsLoading(true);
    getSearchedImages(searchText.toLowerCase()).then(
      (loaded: {results: Array<ImageFullData>}) => {
        setIsLoading(false);
        if (typeof loaded !== 'string' && loaded.results.length > 0) {
          const reworkedData = loaded.results.map(
            (image: ImageFullData) =>
              ({
                id: image.id,
                url: image.urls.regular,
                urlBiggest: image.urls.full,
                description:
                  image.description ||
                  image.alt_description ||
                  `imaginary by ${image.user.username}`,
                created: new Date(image.created_at).toISOString().slice(0, 10),
                author: image.user.username,
                tags: Object.keys(image.topic_submissions),
              } as ImageData),
          );
          store.loadImages(reworkedData);
          setImagesArray(reworkedData);
          setIsRequestDied('');
          storeData(reworkedData, localImages);
          return;
        }

        if (typeof loaded !== 'string' && loaded.results.length === 0) {
          console.error('Ответ пришёл, но массив пуст');
          setImagesArray([]);
          setIsRequestDied('Я НЕ СМОГ НИЧЕГО НАЙТИ 😔');
          return;
        }

        if (typeof loaded === 'string') {
          console.error('Ошибка ответа сервера: ', loaded);
          setImagesArray([]);
          setIsRequestDied('🛠️ ОШИБКА СЕРВЕРА 🛠️');
          return;
        }
      },
    );
  };

  useEffect(() => {
    if (route.params?.tag) {
      setInputText(route.params.tag);
      handleSearch(route.params.tag);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setInputText(text.replace(/[^A-Za-z-]/g, ''))}
          value={inputText}
          placeholder="Используйте английскую раскладку"
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleSearch(inputText.toLowerCase())}>
          <Image
            source={require('../../assets/search-icon.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#00659C" />
        </View>
      )}
      {!isRequestDied && !isLoading ? (
        <ScrollView style={styles.scrollableContainer}>
          <View style={styles.imagesContainer}>
            {imagesArray.map((image, index) => (
              <TouchableOpacity
                key={image.id}
                style={[
                  styles.imageContainer,
                  index === imagesArray.length - 1 && {marginBottom: 0},
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
      ) : (
        <View style={styles.badReqContainer}>
          <Text style={styles.badReqText}>{isRequestDied}</Text>
        </View>
      )}
      <NavigationButton
        navigateCallback={handleNavigation}
        text={'НА ГЛАВНУЮ'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: mainBackgroundColor,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 40,
    width: '95%',
    marginTop: 10,
    marginBottom: 20,
  },
  loaderContainer: {
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollableContainer: {
    width: '95%',
  },
  imagesContainer: {
    paddingBottom: 46,
  },
  input: {
    height: '100%',
    width: '85%',
    padding: 10,
    backgroundColor: '#fff',
  },
  submitButton: {
    width: '15%',
    backgroundColor: buttonsColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  imageContainer: {
    height: 400,
    marginBottom: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  badReqContainer: {
    height: '85%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badReqText: {
    color: mainTextColor,
    fontSize: 20,
  },
});

export default SearchScreen;
