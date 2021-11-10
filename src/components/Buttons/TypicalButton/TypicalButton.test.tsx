import 'react-native';
import React from 'react';
import TypicalButton from './index';

import renderer from 'react-test-renderer';

describe('Correctly rendered default button', () => {
  it('NavigationButton with 2 props renders correctly', () => {
    const btn = renderer.create(
      <TypicalButton action={() => {}} text={'bttn'} />,
    );
    expect(btn.toJSON()).toMatchSnapshot();
    expect(btn.root.findByType('Text').children).toContain('bttn');
  });

  it('NavigationButton with 4 props renders correctly', () => {
    const btn = renderer.create(
      <TypicalButton
        action={() => {}}
        text={'bttn'}
        textStyles={{color: '#000'}}
        buttonStyles={{backgroundColor: '#000'}}
      />,
    );
    expect(btn.toJSON()).toMatchSnapshot();
    expect(btn.root.findByType('Text').children).toContain('bttn');
    expect(btn.toJSON().props.style.backgroundColor).toBe('#000');
    expect(btn.root.findByType('Text').props.style).toEqual({
      color: '#000',
    });
  });
});
