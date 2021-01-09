import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';
import { baseURL } from '../../utils/env';

export const loginUser = (userData, history) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_UI });
      axios
        .post(baseURL + '/login', userData)
        .then((res) => {
          const FBIdToken = `Bearer ${res.data.token}`;
          localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
          axios.defaults.headers.common['Authorization'] = FBIdToken;
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

export const getUserData = () => {
  return async (dispatch, getState) => {
    try {
      axios
        .get('/user')
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
