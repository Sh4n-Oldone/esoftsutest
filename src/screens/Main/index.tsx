import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParams';
import MainImages from '../../components/ListOfImages';
import {ImageData} from '../../types/types';
import {mainBackgroundColor} from '../../constants/constants';
import NavigationButton from '../../components/NavigationButton';

type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

const MainScreen: React.FC = () => {
  const navigation = useNavigation<mainScreenProp>();
  const handleNavigationToDetails = (imageData: ImageData) => {
    navigation.navigate('Details', {...imageData});
  };
  const handleNavigation = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <MainImages navigate={handleNavigationToDetails} />
      <NavigationButton navigateCallback={handleNavigation} text={'К ПОИСКУ'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainBackgroundColor,
  },
});

export default MainScreen;
