import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM
} from '../types';
import axios from 'axios';
import { baseURL } from '../../utils/env';

// GET ALL SCREAMS
export const getScreams = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_DATA });
      axios
        .get(baseURL + '/screams')
        .then((res) => {
          dispatch({
            type: SET_SCREAMS,
            payload: res.data
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: SET_SCREAMS, payload: [] });
        });
    } catch (err) {
      console.log('Error in try-catch block', err);
    }
  };
};
// LIKE A SCREAM
export const likeScream = (screamId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_DATA });
      axios
        .get(baseURL + `/scream/${screamId}/like`)
        .then((res) => {
          dispatch({
            type: LIKE_SCREAM,
            payload: res.data
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log('Error in try-catch block', err);
    }
  };
};
// UNLIKE A SCREAM
export const unlikeScream = (screamId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_DATA });
      axios
        .get(baseURL + `/scream/${screamId}/unlike`)
        .then((res) => {
          dispatch({
            type: LIKE_SCREAM,
            payload: res.data
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log('Error in try-catch block', err);
    }
  };
};
