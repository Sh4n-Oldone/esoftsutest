import {makeAutoObservable} from 'mobx';
import {ImageData} from '../types/types';

class Store {
  images: ImageData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadImages(newImages: ImageData[]) {
    this.images = newImages;
  }

  clearImages() {
    this.images = [];
  }

  addNewImages(newImages: ImageData[]) {
    this.images = [...this.images, ...newImages];
  }
}

const store = new Store();
export default store;
