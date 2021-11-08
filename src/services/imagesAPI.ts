import {apiURL, clientAuthKey, localImages} from '../constants/constants';
import {storeData} from '../tools/localStorage';
import {ImageData, ImageFullData} from '../types/types';

export const getFewImages = async () => {
  return fetch(`${apiURL}/photos/?client_id=${clientAuthKey}`)
    .then(res => {
      if (res.status !== 200) {
        const error = 'Ошибка доставки';
        return error;
      }
      return res.json();
    })
    .then((loaded: Array<ImageFullData>) => {
      if (typeof loaded !== 'string' && loaded.length > 0) {
        const reworkedData = loaded.map(
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
        storeData(reworkedData, localImages);
        return reworkedData;
      }

      if (typeof loaded !== 'string' && loaded.length === 0) {
        console.error('Ответ пришёл, но массив пуст');
        return null;
      }

      if (typeof loaded === 'string') {
        console.error('Ошибка ответа сервера: ', loaded);
        return undefined;
      }
    });
};

export const getSearchedImages = (search: string) => {
  return fetch(
    `${apiURL}/search/photos/?client_id=${clientAuthKey}&query=${search}`,
  ).then(res => {
    if (res.status !== 200) {
      const error = 'Ошибка доставки';
      return error;
    }
    return res.json();
  });
};
