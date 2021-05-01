import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import { DispatchContext, StateContext } from '../../context/userContext';
import { BrowserRouter } from 'react-router-dom';

describe('Header with Authenticated: true', () => {
  let component;
  let contextState = {
    isAuthenticated: true,
    userDetails: { email: 'rohith@gmail.com', firstName: 'rohith' },
  };
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <DispatchContext.Provider value={jest.fn()}>
          <StateContext.Provider value={contextState}>
            <Header />,
          </StateContext.Provider>
        </DispatchContext.Provider>
      </BrowserRouter>
    );
    component.update();
  });

  it('should render header correctly', () => {
    expect(component.find(Header)).toHaveLength(1);
  });
  it('should render logout button', () => {
    expect(component.find('h3').at(1).props().children).toEqual('Logout');
  });

  it('should click logout button and props being updated & login link to render', () => {
    component.find('h3').at(1).props().onClick();
    contextState = { isAuthenticated: false, userDetails: {} };
    component = mount(
      <BrowserRouter>
        <DispatchContext.Provider value={jest.fn()}>
          <StateContext.Provider value={contextState}>
            <Header />,
          </StateContext.Provider>
        </DispatchContext.Provider>
      </BrowserRouter>
    );
    component.update();
    expect(component.find('a[href="/"]').props().children).toEqual('Login');
  });
});

describe('Header with Authenticated: false', () => {
  let component;
  const contextState = {
    isAuthenticated: false,
    userDetails: {},
  };
  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <DispatchContext.Provider value={jest.fn()}>
          <StateContext.Provider value={contextState}>
            <Header />,
          </StateContext.Provider>
        </DispatchContext.Provider>
      </BrowserRouter>
    );
    component.update();
  });

  it('should render header correctly', () => {
    expect(component.find(Header)).toHaveLength(1);
  });

  it('should render signin link', () => {
    expect(component.find('a[href="/"]').props().children).toEqual('Login');
  });
});
