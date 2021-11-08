import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImageData} from '../types/types';

export const storeData = async (
  value: ImageData[],
  key: string,
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify({value});
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Ошибка в записи в localStorage: ', e);
  }
};

export const getData = async (
  key: string,
): Promise<ImageData[] | null | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue).value : null;
  } catch (e) {
    console.log('Ошибка в извлечении из localStorage: ', e);
  }
};
