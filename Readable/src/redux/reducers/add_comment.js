const ADD_COMMENT = '/ADD_COMMENT';

export function addComment(postData) {
  return {
    type: ADD_COMMENT,
    promise: {
      method: 'POST',
      path: '/comments/',
      postData
    },
    postData
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${ADD_COMMENT}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${ADD_COMMENT}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${ADD_COMMENT}_SUCCESS`:
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
