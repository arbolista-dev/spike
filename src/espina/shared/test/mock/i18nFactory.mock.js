const MOCK = {
  t(key, opts) {
    if (!opts) return key;
    return key.replace(/{{([^{}]*)}}/g,
        (a, b) => {
          const r = opts[b];
          return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
  },
  language: 'en',
};

export default MOCK;
