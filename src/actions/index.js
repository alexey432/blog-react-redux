import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    
    // Option 1
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // Option 2 (with _.chain from LODASH library)
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value(); //.value() = execute

};

export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({type: 'FETCH_POSTS', payload: response.data});
    };
};

// ************************************************************************************************************
export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({type: 'FETCH_USER', payload: response.data})
};
// ************************************************************************************************************

// **************WE NEED IT NOT TO MAKE MILLIONS OF GET REQUESTS (it's LODASH librabry)************************
// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({type: 'FETCH_USER', payload: response.data})
// });
// ************************************************************************************************************


// export const fetchUser = (id) => async dispatch => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({type: 'FETCH_USER', payload: response.data})
// }

// export const fetchPosts = () => async (dispatch) => {
    // const response = await jsonPlaceholder.get('/posts');

    // dispatch({type: 'FETCH_POSTS', payload: response});
// };