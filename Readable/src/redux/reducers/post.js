const GET_ALL_POST = '/GET_ALL_POST';

export function getAllPosts() {
  return {
    type: GET_ALL_POST,
    promise: {
      method: 'GET',
      path: '/posts'
    }
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case `${GET_ALL_POST}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${GET_ALL_POST}_SUCCESS`:
      return {
        ...state,
        requesting: false,
        requested: true,
        posts: [...action.response]
      };
    case `${GET_ALL_POST}_FAILURE`:
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
