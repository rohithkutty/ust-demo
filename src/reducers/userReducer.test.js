import userReducer from './userReducer';

describe('user reducer', () => {
  const intialState = { isAuthenticated: false, userDetails: {}, error: null };
  it('should return the initial state', () => {
    expect(
      userReducer({ isAuthenticated: false, userDetails: {}, error: null }, {})
    ).toEqual(intialState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      userReducer([], {
        type: 'LOGIN_SUCCESS',
        payload: {
          firstName: 'Rohith',
          email: 'abc@abc.com',
          password: 'qwerty',
        },
      })
    ).toEqual({
      isAuthenticated: true,
      userDetails: {
        firstName: 'Rohith',
        email: 'abc@abc.com',
        password: 'qwerty',
      },
    });
  });

  it('should handle LOGOUT', () => {
    expect(
      userReducer([], {
        type: 'LOGOUT',
      })
    ).toEqual({
      isAuthenticated: false,
      userDetails: {},
    });
  });
});
