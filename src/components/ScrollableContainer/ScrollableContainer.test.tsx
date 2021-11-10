import 'react-native';
import React from 'react';
import ScrollableContainer from './index';
import renderer from 'react-test-renderer';
import {ImageData} from '../../types/types';

const dataPlug: ImageData[] = [
  {
    id: 'jjhvyxm34nY',
    created: '2017-09-01',
    description: 'Coworking space Industrious Atlanta',
    urlBiggest: 'https://images.unsplash.com/photo-1504297050567',
    url: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3',
    tags: ['business-work', 'interiors'],
    author: 'Mia Baker',
  },
  {
    id: 'jjhvyxm',
    created: '2017-09-02',
    description: 'cattos',
    urlBiggest: 'https://images.unsplash.com/photo-1504297050568',
    url: 'https://images.unsplash.com/photo-1504297050568-910d24c426d4',
    tags: ['cats', 'home'],
    author: 'Mia Alb',
  },
];

describe('Correctly rendered ScrollableContainer', () => {
  it('Rendered with necessary props', () => {
    const container = renderer.create(
      <ScrollableContainer imageClick={() => {}} images={dataPlug} />,
    );
    expect(container.root.findAllByType('Image')[0].props.source).toStrictEqual(
      {
        uri: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3',
      },
    );
    expect(container.root.findAllByType('Image')[1].props.source).toStrictEqual(
      {
        uri: 'https://images.unsplash.com/photo-1504297050568-910d24c426d4',
      },
    );
    expect(container.toJSON()).toMatchSnapshot();
  });

  it('Rendered with all props', () => {
    const container = renderer.create(
      <ScrollableContainer
        imageClick={() => {}}
        images={dataPlug}
        componentWidth={'200'}
        newContainerStyles={[{backGroundColor: '#000'}]}
        newImageStyles={[{backGroundColor: '#fff'}]}
      />,
    );
    expect(container.toJSON()).toMatchSnapshot();
    expect(container.root.findAllByType('Image')[0].props.source).toStrictEqual(
      {
        uri: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3',
      },
    );
    expect(container.root.findAllByType('Image')[1].props.source).toStrictEqual(
      {
        uri: 'https://images.unsplash.com/photo-1504297050568-910d24c426d4',
      },
    );
    
    // и ScrollView, и TouchableOpacity наследуются от View,
    expect(container.root.findAllByType('View')[1].props.style).toStrictEqual([
      {backGroundColor: '#000'},
    ]);
    expect(
      container.root.findAllByType('View')[2].props.style.backGroundColor,
    ).toBe('#fff');
    expect(container.toJSON().props.style.width).toBe('200');
  });
});
