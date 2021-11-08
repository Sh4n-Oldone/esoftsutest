import React, {useEffect, useState} from 'react';
import {
  View,
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
  mainBackgroundColor,
  mainTextColor,
} from '../../constants/constants';
import NavigationButton from '../../components/Buttons/NavigationButton';
import {getSearchedImages} from '../../services/imagesAPI';
import {ImageData} from '../../types/types';
import ScrollableContainer from '../../components/ScrollableContainer';

type searchScreenProp = StackNavigationProp<RootStackParamList, 'Search'>;

const SearchScreen: React.FC<{route: {params: {tag: string}}}> = ({route}) => {
  // viva la batching
  // но в старых версиях реакта я бы сделал один стейт с объектом
  // и работал с его ключами через prev запись
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
    getSearchedImages(
      searchText.toLowerCase(),
      setIsLoading,
      setImagesArray,
      setIsRequestDied,
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
        <ScrollableContainer
          componentWidth={'95%'}
          images={imagesArray}
          imageClick={handleImageClick}
        />
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
