const EDIT_POST = '/EDIT_POST';
const VOTE_POST = '/VOTE_POST';

export function editPost(postData, postId) {
  return {
    type: EDIT_POST,
    promise: {
      method: 'PUT',
      path: `/posts/${postId}`,
      postData
    },
    postData
  };
}

export function vote(postData, postId) {
  return {
    type: VOTE_POST,
    promise: {
      method: 'POST',
      path: `/posts/${postId}`,
      postData
    },
    postData
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${EDIT_POST}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${EDIT_POST}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${EDIT_POST}_SUCCESS`:
      return {
        ...state,
        requesting: false,
        requested: true,
        ...action.response
      };
    case `${VOTE_POST}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${VOTE_POST}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${VOTE_POST}_SUCCESS`:
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
