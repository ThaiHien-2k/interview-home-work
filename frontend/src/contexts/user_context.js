import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/user_reducer";
import {
  users_url,
  update_user_url,
  create_new_user,
} from "../utils/constants";
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

const initialState = {
  users_loading: false,
  users_error: false,
  users: [],
  new_user: {
    id: "",
    owner: "",
    content: "",
    title: "",
    createdAt: "",
    tags: [],
  },
  single_user_loading: false,
  single_user_error: false,
  single_user: {},
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async () => {
    dispatch({ type: GET_USERS_BEGIN });
    try {
      const response = await axios.get(users_url);
      const { data } = response.data;
      dispatch({ type: GET_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USERS_ERROR });
    }
  };

  const fetchSingleUser = async (id) => {
    dispatch({ type: GET_SINGLE_USER_BEGIN });
    try {
      const response = await axios.get(`${users_url}${id}`);
      const { data } = response.data;
      dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_USER_ERROR });
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${update_user_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewUserDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    dispatch({ type: CREATE_NEW_USER, payload: { name, value } });
  };

  const updateExistingUserDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    dispatch({ type: UPDATE_EXISTING_USER, payload: { name, value } });
  };

  const createNewUser = async (user) => {
    try {
      const response = await axios.user(create_new_user, user);
      const { success, data } = response.data;
      fetchUsers();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateUser = async (id, user) => {
    try {
      const response = await axios.put(`${update_user_url}${id}`, user);
      const { success, message } = response.data;
      // fetchusers();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        deleteUser,
        updateNewUserDetails,
        updateExistingUserDetails,
        createNewUser,
        fetchUsers,
        fetchSingleUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
