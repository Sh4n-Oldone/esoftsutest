import 'react-native';
import React from 'react';
import NavigationButton from './index';

import renderer from 'react-test-renderer';

describe('Correctly rendered button', () => {
  it('NavigationButton with 2 props renders correctly', () => {
    const btn = renderer
      .create(<NavigationButton navigateCallback={() => {}} text={'bttn'} />)
      .toJSON();
    expect(btn).toMatchSnapshot();
  });

  it('NavigationButton with 2 props have only child', () => {
    const btn = renderer
      .create(
        <NavigationButton navigateCallback={() => {}} text={'to search'} />,
      )
      .toJSON();
    expect(btn.children.length).toBe(1);
  });
});
