import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({type: 'FETCH_POSTS', payload: response.data});
    };
};

// **************WE NEED IT NOT TO MAKE MILLIONS OF GET REQUESTS (it's lodash librabry)************************
export const fetchUser = (id) => dispatch => {
    _fetchUser(id, dispatch);
};

const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({type: 'FETCH_USER', payload: response.data})
});
// ************************************************************************************************************


// export const fetchUser = (id) => async dispatch => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({type: 'FETCH_USER', payload: response.data})
// }

// export const fetchPosts = () => async (dispatch) => {
    // const response = await jsonPlaceholder.get('/posts');

    // dispatch({type: 'FETCH_POSTS', payload: response});
// };