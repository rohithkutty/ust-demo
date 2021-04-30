function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        userDetails: payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        userDetails: {},
      };
    case 'ERROR':
      return {
        ...state,
        isAuthenticated: true,
        userDetails: {},
        error: payload,
      };
    default:
      throw new Error();
  }
}

export default userReducer;
