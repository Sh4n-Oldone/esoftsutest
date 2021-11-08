import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getFewImages} from '../services/imagesAPI';
import store from '../store/store';
import MainScreen from '../screens/Main';
import DetailsScreen from '../screens/Details';
import SearchScreen from '../screens/Search';
import {RootStackParamList} from '../screens/RootStackParams';
import {
  darkerMainBackground,
  localImages,
  mainTextColor,
} from '../constants/constants';
import {getData} from '../tools/localStorage';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  useEffect(() => {
    getData(localImages).then(local => {
      if (local) {
        store.loadImages(local);
        return;
      }
      getFewImages().then(reworkedData => {
        store.loadImages(reworkedData || []);
      });
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: 'Наша галлерея',
            headerStyle: {
              backgroundColor: darkerMainBackground,
            },
            headerTintColor: mainTextColor,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Детали изображения',
            headerStyle: {
              backgroundColor: darkerMainBackground,
            },
            headerTintColor: mainTextColor,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Поиск изображений',
            headerStyle: {
              backgroundColor: darkerMainBackground,
            },
            headerTintColor: mainTextColor,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
