import React from 'react';
import { shallow } from 'enzyme';
import Homepage from './Homepage';

describe('Homepage', () => {
  let component;
  const map = {
    message: jest.fn(),
  };
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });

  beforeEach(() => {
    component = shallow(<Homepage />);
  });

  it('should render properly', () => {
    expect(component).toHaveLength(1);
  });

  it('should click the button inside iframe', () => {
    component
      .find('input[name="user"]')
      .simulate('change', { target: { value: 'Rohith' } });
    component.find('button').at(0).props().onClick();
    component.update();
  });

  map.message({
    event_id: 'ust_message',
    name: 'Rohith',
  });
  it('onmessage eventlistener to be called', () => {
    expect(component.setUserName).toBeUndefined();
  });
});
