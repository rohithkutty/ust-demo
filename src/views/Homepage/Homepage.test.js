import React from 'react';
import { shallow } from 'enzyme';
import Homepage from './Homepage';

describe('Homepage', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Homepage />);
  });
  it('should render properly', () => {
    console.log(component.debug());
  });
});
