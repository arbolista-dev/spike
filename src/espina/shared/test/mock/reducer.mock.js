export const MOCK_ACTION_OK = {
  type: 'MOCK_ACTION_OK',
};
export const MOCK_ACTION_FAIL = {
  type: 'MOCK_ACTION_FAIL',
};

export const MOCK_REDUCER = (state = { ok: false }, action) => {
  switch (action.type) {
    case 'MOCK_ACTION_OK':
      return Object.assign({}, state, { ok: true });
    case 'MOCK_ACTION_FAIL':
      return Object.assign({}, state, { ok: false });
    default:
      return state;
  }
};
