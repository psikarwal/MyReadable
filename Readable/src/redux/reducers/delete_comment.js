const DELETE_COMMENT = '/DELETE_COMMENT';

export function deleteComment(commentId) {
  return {
    type: DELETE_COMMENT,
    promise: {
      method: 'DELETE',
      path: `/comments/${commentId}`
    }
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${DELETE_COMMENT}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${DELETE_COMMENT}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${DELETE_COMMENT}_SUCCESS`:
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
