const ADD_POST = '/ADD_POST';

export function addPost(postData) {
  return {
    type: ADD_POST,
    promise: {
      method: 'POST',
      path: '/posts/',
      postData
    },
    postData
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${ADD_POST}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${ADD_POST}_FAILURE`:
      return {
        ...state,
        requesting: false,
        requested: true
      };
    case `${ADD_POST}_SUCCESS`:
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
