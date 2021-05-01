import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import SignIn from './SignIn';
import { DispatchContext } from '../../context/userContext';

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

describe('Testing SignIn', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <DispatchContext.Provider value={jest.fn()}>
          <SignIn />
        </DispatchContext.Provider>
      </BrowserRouter>
    );
    component.update();
  });

  it('Should render properly', () => {
    expect(component).toBeTruthy();
  });
  it('Should update email on input change', async () => {
    await act(async () => {
      component
        .find('[name="email"]')
        .at(0)
        .props()
        .onChange({ target: { value: 'rohith@gmail.com' } });
    });
    await component.update();
    expect(component.find('[name="email"]').at(0).props().value).toBe(
      'rohith@gmail.com'
    );
  });
  it('Should update password on input change', async () => {
    await act(async () => {
      component
        .find('[name="password"]')
        .at(0)
        .props()
        .onChange({ target: { value: 'secret' } });
    });
    await component.update();
    expect(component.find('[name="password"]').at(0).props().value).toBe(
      'secret'
    );
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
    it('should handle form submit', async () => {
      await act(async () => {
        component
          .find('[name="email"]')
          .at(0)
          .props()
          .onChange({ target: { value: 'abc@abc.com' } });
      });
      await act(async () => {
        component
          .find('[name="password"]')
          .at(0)
          .props()
          .onChange({ target: { value: 'qwerty' } });
      });
      await component.update();
      component.find('form').props().onSubmit({ preventDefault: jest.fn() });
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });

    it('should handle invalid password scenario', async () => {
      await act(async () => {
        component
          .find('[name="email"]')
          .at(0)
          .props()
          .onChange({ target: { value: 'abc@abc.com' } });
      });
      await act(async () => {
        component
          .find('[name="password"]')
          .at(0)
          .props()
          .onChange({ target: { value: 'secret' } });
      });
      await component.update();
      component.find('form').props().onSubmit({ preventDefault: jest.fn() });
      await component.update();
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });

    it('should handle invalid account details scenario', async () => {
      await act(async () => {
        component
          .find('[name="email"]')
          .at(0)
          .props()
          .onChange({ target: { value: 'rohith@gmail.com' } });
      });
      await act(async () => {
        component
          .find('[name="password"]')
          .at(0)
          .props()
          .onChange({ target: { value: 'secret' } });
      });
      await component.update();
      component.find('form').props().onSubmit({ preventDefault: jest.fn() });
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
  });
});
