import {ImageData} from '../types/types';

export type RootStackParamList = {
  Main: undefined;
  Details: ImageData | undefined;
  Search: {tag: string} | undefined;
};
