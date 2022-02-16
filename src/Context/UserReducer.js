export const initialState = {
  user: {},
};

const RegisterReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action?.payload?.user,
      };

    default:
      return state;
  }
};

export default RegisterReducer;
