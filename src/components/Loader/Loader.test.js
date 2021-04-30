import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('Test Loader', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Loader />);
  });

  it('should render properly', () => {
    expect(component).toBeTruthy();
  });
});
