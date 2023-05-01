import { state } from './../../state.js';

export const changeLang = () => {
  state.isCtrlPress = false;
  state.isAltPress = false;
  if (state.lang === 'en') {
    state.setProperty('lang', 'ru');
    localStorage.setItem('lang', state.lang);
  } else if (state.lang === 'ru') {
    state.setProperty('lang', 'en');
    localStorage.setItem('lang', state.lang);
  }
};

export const onCtrlPress = () => {
  state.isCtrlPress = true;
  if (state.isAltPress) {
    changeLang();
  }
};

export const onAltPress = () => {
  state.isAltPress = true;
  if (state.isCtrlPress) {
    changeLang();
  }
};
