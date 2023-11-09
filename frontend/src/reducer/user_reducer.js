import {
  CREATE_NEW_USER,
  GET_USERS_BEGIN,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  UPDATE_EXISTING_USER,
  GET_SINGLE_USER_BEGIN,
  GET_SINGLE_USER_ERROR,
  GET_SINGLE_USER_SUCCESS,
} from "../action";

const user_reducer = (state, action) => {
  if (action.type === GET_USERS_BEGIN) {
    return { ...state, users_error: false, users_loading: true };
  }
  if (action.type === GET_USERS_ERROR) {
    return { ...state, users_error: true, users_loading: false };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      users_loading: false,
      users: action.payload,
    };
  }
  if (action.type === CREATE_NEW_USER) {
    const { name, value } = action.payload;
    return { ...state, new_user: { ...state.new_user, [name]: value } };
  }
  if (action.type === GET_SINGLE_USER_BEGIN) {
    return {
      ...state,
      single_user_error: false,
      single_user_loading: true,
    };
  }
  if (action.type === GET_SINGLE_USER_ERROR) {
    return {
      ...state,
      single_user_error: true,
      single_user_loading: false,
    };
  }
  if (action.type === GET_SINGLE_USER_SUCCESS) {
    return {
      ...state,
      single_user_loading: false,
      single_user: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_USER) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_user: { ...state.single_user, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default user_reducer;
