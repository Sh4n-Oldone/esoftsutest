import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import SearchInput from './index';

// const mockedNavigate = jest.fn();

// jest.mock('@react-navigation/native', () => ({
//   useNavigation: () => ({navigate: mockedNavigate}),
// }));

describe('Search input component', () => {
  it('Input rendered correctly', () => {
    const component = renderer.create(<SearchInput />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Input validate correctly', () => {
    const onChangeTextMock = jest.fn(text => text.replace(/[^A-Za-z-]/g, ''));
    const newTestValue = '123cats123';
    const input = renderer.create(
      <SearchInput
        textHandler={onChangeTextMock}
        inputValue={onChangeTextMock(newTestValue)}
      />,
    );
    expect(input.toJSON().props.value).toBe('cats');
  });
});
