const EDIT_COMMENT = '/EDIT_COMMENT';
const VOTE_COMMENT = '/VOTE_COMMENT';

export function editComment(postData, commentId) {
  return {
    type: EDIT_COMMENT,
    promise: {
      method: 'PUT',
      path: `/comments/${commentId}`,
      postData
    },
    postData
  };
}

export function voteComment(postData, commentId) {
  return {
    type: VOTE_COMMENT,
    promise: {
      method: 'POST',
      path: `/comments/${commentId}`,
      postData
    },
    postData
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${EDIT_COMMENT}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${EDIT_COMMENT}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${EDIT_COMMENT}_SUCCESS`:
      return {
        ...state,
        requesting: false,
        requested: true,
        ...action.response
      };
    case `${VOTE_COMMENT}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${VOTE_COMMENT}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${VOTE_COMMENT}_SUCCESS`:
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
