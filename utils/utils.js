import { buttons } from 'https://zena86.github.io/virtual-keyboard/data.js';
import { state } from 'https://zena86.github.io/virtual-keyboard/state.js';

export const getButtonData = (e, btns) => {
  return btns.filter((x) => x.keyCode === e.keyCode);
};

export const getKeyId = (e, buttonData) => {
  if (buttonData && buttonData.length === 1) {
    return buttonData[0].id;
  }
  if (e.code === 'ShiftLeft') {
    return '42';
  }
  if (e.code === 'ShiftRight') {
    return '54';
  }
  if (e.code === 'ControlLeft') {
    return '55';
  }
  if (e.code === 'ControlRight') {
    return '63';
  }
  if (e.code === 'AltLeft') {
    return '57';
  }
  if (e.code === 'AltRight') {
    return '59';
  }
  return '-1';
};

export const changeStateOnButtonClick = (e) => {
  const id = e.target.getAttribute('id');
  const idNum = +id;
  if (
    (idNum >= 0 && idNum <= 12)
    || (idNum >= 15 && idNum <= 27)
    || (idNum >= 30 && idNum <= 40)
    || (idNum >= 43 && idNum <= 52)
  ) {
    const keyCode = buttons.filter((el) => el.id === id)[0].keyCode;
    state.setProperty('lastKey', {
      keyCode: keyCode,
      isVirtual: true
    });
  } else if (id === '13') {
    state.setProperty('isBackspace', true);
  } else if (id === '14') {
    state.setProperty('isTab', true);
  } else if (id === '28') {
    state.setProperty('isDel', true);
  } else if (id === '29') {
    state.setProperty('isUppercase', !state.isUppercase);
  } else if (id === '41') {
    state.setProperty('isEnter', true);
  } else if (id === '58') {
    state.setProperty('isIndent', true);
  } else if (id === '60') {
    state.setProperty('isToLeft', true);
  } else if (id === '61') {
    state.setProperty('isToDown', true);
  } else if (id === '53') {
    state.setProperty('isToUp', true);
  } else if (id === '62') {
    state.setProperty('isToRight', true);
  }
};

export const changeStateOnMousedown = (e) => {
  const id = e.target.getAttribute('id');
  if (id === '42' || id === '54') {
    state.setProperty('isShiftPress', true);
  }
};

export const changeStateOnMouseup = (e) => {
  const id = e.target.getAttribute('id');
  if (id === '42' || id === '54') {
    state.setProperty('isShiftPress', false);
  }
};

export const changeStateOnKeyPress = (e) => {
  state.setProperty('lastKey', {
    code: e.code,
    key: e.key,
    keyCode: e.keyCode,
    isVirtual: false
  });
};

export const getCharacter = () => {
  let valArr = null;
  let val = '';
  valArr = buttons.filter((el) => el.keyCode === state.lastKey.keyCode);
  if (valArr.length === 0) {
    return null;
  }
  let keyId = valArr[0].id;

  if (
    state.lang === 'en'
    && state.isShiftPress
    && valArr[0].withShiftEn
    && (
      (keyId >= 0 && keyId <= 12)
      || (keyId >= 24 && keyId <= 27)
      || (keyId >= 38 && keyId <= 40)
      || (keyId >= 49 && keyId <= 52)
    )
  ) {
    val = valArr[0].withShiftEn;
    return val;
  }

  if (
    state.lang === 'ru'
    && state.isShiftPress
    && valArr[0].withShiftRu
    && (
      (keyId >= 0 && keyId <= 12)
      || keyId === '52'
    )
  ) {
    val = valArr[0].withShiftRu;
    return val;
  }

  if (
    (keyId >= 0 && keyId <= 12)
    || (keyId >= 15 && keyId <= 27)
    || (keyId >= 30 && keyId <= 40)
    || (keyId >= 43 && keyId <= 52)
  ) {
    if (state.lang === 'ru') {
      val = valArr[0].titleRu;
    } else if (state.lang === 'en') {
      val = valArr[0].titleEn;
    }
    return val;
  }

  return null;
};

export const changeStateOnCaps = () => {
  state.setProperty('isUppercase', !state.isUppercase);
};

export const changeStateOnEnter = () => {
  state.setProperty('isEnter', true);
};

export const onShiftPress = () => {
  state.setProperty('isShiftPress', true);
};

export const onIndentPress = () => {
  state.setProperty('isIndent', true);
};
