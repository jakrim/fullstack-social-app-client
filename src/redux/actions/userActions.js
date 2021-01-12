import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from '../types';
import axios from 'axios';
import { baseURL } from '../../utils/env';

export const getUserData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_USER });
      axios
        .get(baseURL + '/user')
        .then((res) => {
          dispatch({
            type: SET_USER,
            payload: res.data
          });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log('Error in try-catch block', err);
    }
  };
};

const setAuthHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const loginUser = (userData, history) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_UI });
      axios
        .post(baseURL + '/login', userData)
        .then((res) => {
          setAuthHeader(res.data.token);
          dispatch(getUserData());
          dispatch({ type: CLEAR_ERRORS });
          history.push('/');
        })
        .catch((err) => {
          dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
    } catch (err) {
      console.log('Error in try-catch block', err);
    }
  };
};

export const signupUser = (newUserData, history) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_UI });
      axios
        .post(baseURL + '/signup', newUserData)
        .then((res) => {
          setAuthHeader(res.data.token);
          dispatch(getUserData());
          dispatch({ type: CLEAR_ERRORS });
          history.push('/');
        })
        .catch((err) => {
          dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
    } catch (err) {
      console.log('Error in try-catch block', err);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    try {
      localStorage.removeItem('FBIdToken');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: SET_UNAUTHENTICATED });
    } catch (err) {
      console.log('Error in try-catch block', err);
    }
  };
};

export const uploadImage = (formData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_USER });
      axios
        .post(baseURL + '/user/image', formData)
        .then(() => {
          dispatch(getUserData());
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log('Error in try-catch block', err);
    }
  };
};

export const editUserDetails = (userDetails) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_USER });
      axios
        .post(baseURL + '/user', userDetails)
        .then(() => {
          dispatch(getUserData());
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log('Error in try-catch block', err);
    }
  };
};
