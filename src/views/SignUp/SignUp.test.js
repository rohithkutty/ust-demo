import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
});

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('SignUp', () => {
  let component;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    component = shallow(<SignUp />);
    window.sessionStorage.clear();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    expect(component.find('h1').at(0).props().children).toEqual(
      'Welcome to HandelX'
    );
  });

  it('should enter value in First name', () => {
    component
      .find('[name="firstName"]')
      .props()
      .onChange({ target: { value: 'Rohith' } });
    expect(component.find('[name="firstName"]').props().value).toBe('Rohith');
  });

  it('should enter value in Last name', () => {
    component
      .find('[name="lastName"]')
      .props()
      .onChange({ target: { value: 'Surya' } });
    expect(component.find('[name="lastName"]').props().value).toBe('Surya');
  });
  it('should enter value in Email', () => {
    component
      .find('[name="email"]')
      .props()
      .onChange({ target: { value: 'rohith_gonela@yahoo.com' } });
    expect(component.find('[name="email"]').props().value).toBe(
      'rohith_gonela@yahoo.com'
    );
  });

  it('should enter value in password', () => {
    component
      .find('[name="password"]')
      .props()
      .onChange({ target: { value: 'qwerty' } });
    expect(component.find('[name="password"]').props().value).toBe('qwerty');
  });

  it('should select gender', () => {
    expect(component.find('[name="gender"]').props().value).toEqual('Male');
    component.find('[name="gender"]').props().onChange('Female');
    expect(component.find('[name="gender"]').props().value).toEqual('Female');
  });

  describe('Testing form submit', () => {
    beforeEach(() => {
      window.sessionStorage.setItem(
        'customer',
        JSON.stringify([
          {
            email: 'abc@abc.com',
            firstName: 'Rohith',
            lastName: 'Surya',
            password: 'qwerty',
            userType: 'Male',
          },
        ])
      );
    });

    it('should validate the sessionStorage', () => {
      const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
      const actualValue = JSON.parse(window.sessionStorage.getItem('customer'));
      expect(actualValue).toEqual([
        {
          email: 'abc@abc.com',
          firstName: 'Rohith',
          lastName: 'Surya',
          password: 'qwerty',
          userType: 'Male',
        },
      ]);
      expect(getItemSpy).toBeCalledWith('customer');
    });
    it('should handle form submit', () => {
      component
        .find('[name="firstName"]')
        .props()
        .onChange({ target: { value: 'Rohith' } });
      component
        .find('[name="lastName"]')
        .props()
        .onChange({ target: { value: 'Surya' } });
      component
        .find('[name="email"]')
        .props()
        .onChange({ target: { value: 'rohith_gonela@yahoo.com' } });
      component
        .find('[name="password"]')
        .props()
        .onChange({ target: { value: 'qwerty' } });
      component.find('[name="gender"]').props().onChange('Male');
      component.find('form').props().onSubmit({ preventDefault: jest.fn() });
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });

    it('should handle existing user scenario', () => {
      component
        .find('[name="firstName"]')
        .props()
        .onChange({ target: { value: 'Rohith' } });
      component
        .find('[name="lastName"]')
        .props()
        .onChange({ target: { value: 'Surya' } });
      component
        .find('[name="email"]')
        .props()
        .onChange({ target: { value: 'abc@abc.com' } });
      component
        .find('[name="password"]')
        .props()
        .onChange({ target: { value: 'qwerty' } });
      component.find('[name="gender"]').props().onChange('Male');
      component.find('form').props().onSubmit({ preventDefault: jest.fn() });
      expect(mockHistoryPush).toHaveBeenCalledTimes(0);
    });
  });
});
