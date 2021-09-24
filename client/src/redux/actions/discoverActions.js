import { GLOBALTYPES } from './globalTypes';
import { getDataAPI } from './../../utils/fetchData';

export const DISCOVER_TYPES = {
  LOADING: 'DISCOVER_LOADING',
  GET_DISCOVER_POSTS: 'GET_DISCOVER_POSTS'
};

export const getDiscoverPost = (token) => async(dispatch) => {
  try {
    dispatch({
      type: DISCOVER_TYPES.LOADING,
      payload: true
    });

    const res = await getDataAPI('post/discover', token);
    dispatch({
      type: DISCOVER_TYPES.GET_DISCOVER_POSTS,
      payload: {
        ...res.data,
        page: 2
      }
    });

    dispatch({
      type: DISCOVER_TYPES.LOADING,
      payload: false
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