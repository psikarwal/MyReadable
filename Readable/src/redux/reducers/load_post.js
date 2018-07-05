const LOAD_POST = '/LOAD_POST';

export function loadPost(postId) {
  return {
    type: LOAD_POST,
    promise: {
      method: 'GET',
      path: `/posts/${postId}`
    }
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${LOAD_POST}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${LOAD_POST}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${LOAD_POST}_SUCCESS`:
      return {
        ...state,
        requesting: false,
        requested: true,
        post: { ...action.response }
      };
    default:
      return state;
  }
}
