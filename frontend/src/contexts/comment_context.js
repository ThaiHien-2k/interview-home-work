import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/comment_reducer";
import {
  comments_url,
  update_comment_url,
  create_new_comment,
} from "../utils/constants";
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

const initialState = {
  comments_loading: false,
  comments_error: false,
  comments: [],
  new_comment: {
    id: "",
    owner: "",
    content: "",
    title: "",
    createdAt: "",
    tags: [],
  },
  single_comment_loading: false,
  single_comment_error: false,
  single_comment: {},
};

const CommentContext = React.createContext();

export const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchComments = async () => {
    dispatch({ type: GET_COMMENTS_BEGIN });
    try {
      const response = await axios.get(comments_url);
      const { data } = response.data;
      dispatch({ type: GET_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_COMMENTS_ERROR });
    }
  };

  const fetchSingleComment = async (id) => {
    dispatch({ type: GET_SINGLE_COMMENT_BEGIN });
    try {
      const response = await axios.get(`${comments_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_COMMENT_ERROR });
    }
  };

  const deleteComment = async (id) => {
    try {
      const response = await axios.delete(`${update_comment_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewCommentDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    dispatch({ type: CREATE_NEW_COMMENT, payload: { name, value } });
  };

  const updateExistingCommentDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    dispatch({ type: UPDATE_EXISTING_COMMENT, payload: { name, value } });
  };

  const createNewComment = async (comment) => {
    try {
      const response = await axios.comment(create_new_comment, comment);
      const { success, data } = response.data;
      fetchComments();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateComment = async (id, comment) => {
    try {
      const response = await axios.put(`${update_comment_url}${id}`, comment);
      const { success, message } = response.data;
      // fetchcomments();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <CommentContext.Provider
      value={{
        ...state,
        deleteComment,
        updateNewCommentDetails,
        updateExistingCommentDetails,
        createNewComment,
        fetchComments,
        fetchSingleComment,
        updateComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};
