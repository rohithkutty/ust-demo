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
    default:
      return state;
  }
}

export default userReducer;
