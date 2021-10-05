import { GLOBALTYPES } from './../constants/globalTypes';
import { postDataAPI } from './../../utils/fetchData';

export const register = (userData) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('register', userData);
    localStorage.setItem('logged', true);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user
      }
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const login = (userData) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('login', userData);
    localStorage.setItem('logged', true);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user
      }
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const refreshToken = () => async(dispatch) => {
  const logged = localStorage.getItem('logged');
  if (logged) {
    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          loading: true
        }
      });

      const res = await postDataAPI('refresh_token');
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.accessToken,
          user: res.data.user
        }
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg
        }
      });
    }
  }
}

export const logout = () => async(dispatch) => {
  try {
    localStorage.removeItem('logged');
    await postDataAPI('logout');
    window.location.href='/';
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}