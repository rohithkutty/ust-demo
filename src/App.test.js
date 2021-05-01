import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App.js', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
    component.update();
  });

  it('Should render properly', () => {
    expect(component).toHaveLength(1);
  });
});
