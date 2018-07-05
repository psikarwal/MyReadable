const DELETE_POST = '/DELETE_POST';

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    promise: {
      method: 'DELETE',
      path: `/posts/${postId}`
    }
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${DELETE_POST}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${DELETE_POST}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${DELETE_POST}_SUCCESS`:
      return {
        ...state,
        requesting: false,
        requested: true,
        ...action.response
      };
    default:
      return state;
  }
}
