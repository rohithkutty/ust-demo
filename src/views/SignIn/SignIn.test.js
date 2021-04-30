import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn';

describe('Testing SignIn', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SignIn />);
    component.update();
  });

  it('Should render properly', () => {
    console.log(component.debug());
  });
});
