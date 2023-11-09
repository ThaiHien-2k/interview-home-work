import {
  CREATE_NEW_COMMENT,
  GET_COMMENTS_BEGIN,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_SUCCESS,
  UPDATE_EXISTING_COMMENT,
  GET_SINGLE_COMMENT_BEGIN,
  GET_SINGLE_COMMENT_ERROR,
  GET_SINGLE_COMMENT_SUCCESS,
} from "../action";

const comment_reducer = (state, action) => {
  if (action.type === GET_COMMENTS_BEGIN) {
    return { ...state, comments_error: false, comments_loading: true };
  }
  if (action.type === GET_COMMENTS_ERROR) {
    return { ...state, comments_error: true, comments_loading: false };
  }
  if (action.type === GET_COMMENTS_SUCCESS) {
    return {
      ...state,
      comments_loading: false,
      comments: action.payload,
    };
  }
  if (action.type === CREATE_NEW_COMMENT) {
    const { name, value } = action.payload;
    return { ...state, new_comment: { ...state.new_comment, [name]: value } };
  }
  if (action.type === GET_SINGLE_COMMENT_BEGIN) {
    return {
      ...state,
      single_comment_error: false,
      single_comment_loading: true,
    };
  }
  if (action.type === GET_SINGLE_COMMENT_ERROR) {
    return {
      ...state,
      single_comment_error: true,
      single_comment_loading: false,
    };
  }
  if (action.type === GET_SINGLE_COMMENT_SUCCESS) {
    return {
      ...state,
      single_comment_loading: false,
      single_comment: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_COMMENT) {
    const { name, value } = action.payload;
    return {
      ...state,
      single_comment: { ...state.single_comment, [name]: value },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default comment_reducer;
