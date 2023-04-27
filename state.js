export const state = {
  code: 'init',
  key: 'init',
  isUppercase: false,
  lang: 'en',

  subscribe: (propertyName, callback) => {
    state.subscribeList.push({ propertyName: propertyName, callback: callback });
  },
  subscribeList: [],
  setProperty: (propertyName, value) => {
    state[propertyName] = value;
    state.subscribeList
    .filter((item) => item.propertyName === propertyName)
    .forEach((item) => { item.callback(); });
  },
}
