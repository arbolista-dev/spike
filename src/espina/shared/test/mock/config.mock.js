
export const MOCK_ROUTES = {
  name: 'MockRoute',
  path: '/:mock1?/mock2/:mock3?',
  url(action, i18n, payload, params) {
    let query = '';
    if (params && params.mockparam) {
      query = `?MockParam=${params.mockparam}`;
    }
    return `/${i18n.t('MockRoute')}/${payload.id}/success${query}`;
  },
  component: 'espina/shared/test/mock/component.mock',
};
export const MOCK_PARAMS = {
  mockparam: 'MockParam',
};
export const MOCK_PAYLOAD = {
  id: 'MockValue',
};
export const MOCK_LOCALSTORAGE = {
  token: '123456',
  mockdata: JSON.stringify({
    mockkey: 'mockvalue',
  }),
  getItem: value => MOCK_LOCALSTORAGE[value],
};

export const MOCK_LOCATION = { pathname: '/mockValue1/mock2/mockValue2', search: '?mockQuery=mockValue' };

export const MOCK_COOKIES = {
  token: '123456',
};

export const MOCK_STORE = {
  session: {
    MOCK_COOKIES,
    get: key => this[key],
  },
  location: MOCK_LOCATION,
};

