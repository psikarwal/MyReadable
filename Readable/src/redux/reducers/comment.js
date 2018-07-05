const GET_ALL_COMMENT = '/GET_ALL_COMMENT';

export function getAllComments(postId) {
  return {
    type: GET_ALL_COMMENT,
    promise: {
      method: 'GET',
      path: `/posts/${postId}/comments`
    }
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${GET_ALL_COMMENT}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${GET_ALL_COMMENT}_SUCCESS`:
      return {
        ...state,
        requesting: false,
        requested: true,
        comments: [...action.response]
      };
    case `${GET_ALL_COMMENT}_FAILURE`:
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
