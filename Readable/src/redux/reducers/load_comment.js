const LOAD_COMMENT = '/LOAD_COMMENT';

export function loadComment(commentId) {
  return {
    type: LOAD_COMMENT,
    promise: {
      method: 'GET',
      path: `/comments/${commentId}`
    }
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${LOAD_COMMENT}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${LOAD_COMMENT}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${LOAD_COMMENT}_SUCCESS`:
      return {
        ...state,
        requesting: false,
        requested: true,
        comment: { ...action.response }
      };
    default:
      return state;
  }
}
