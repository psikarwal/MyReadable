const GET_CATEGORY_POST = '/GET_CATEGORY_POST';

export function getCategoryPost(category) {
  return {
    type: GET_CATEGORY_POST,
    promise: {
      method: 'GET',
      path: `/${category}/posts`
    }
  };
}

export default function reducer(state = { posts: [] }, action) {
  switch (action.type) {
    case `${GET_CATEGORY_POST}_REQUEST`:
      return {
        ...state,
        requesting: true
      };
    case `${GET_CATEGORY_POST}_SUCCESS`:
      return {
        ...state,
        requesting: false,
        requested: true,
        posts: [...action.response]
      };
    case `${GET_CATEGORY_POST}_FAILURE`:
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
