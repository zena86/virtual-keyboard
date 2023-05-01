import { state } from './../../state.js';
import {
  changeStateOnButtonClick,
  changeStateOnMousedown,
  changeStateOnMouseup
} from '../../utils/utils.js';

export class Button {
  constructor(id, className, titleRu, titleEn, isLetter, withShiftRu, withShiftEn) {
    this.id = id;
    this.className = className;
    this.titleRu = titleRu;
    this.titleEn = titleEn;
    this.isLetter = isLetter;
    this.withShiftRu = withShiftRu;
    this.withShiftEn = withShiftEn;
    this.buttonEl = null;
  }

  render() {
    this.buttonEl = document.createElement('button');
    this.drowBtnTitle();
    this.buttonEl.id = this.id;
    this.buttonEl.className = this.className;
    this.buttonEl.addEventListener('click', (e) => {
      changeStateOnButtonClick(e);
    });
    this.buttonEl.addEventListener('mousedown', (e) => {
      changeStateOnMousedown(e);
    });
    this.buttonEl.addEventListener('mouseup', (e) => {
      changeStateOnMouseup(e);
    });
    return this.buttonEl;
  }

  changeSymbolWithShift(that) {
    const isUpper = (state.isShiftPress && !state.isUppercase)
      || (!state.isShiftPress && state.isUppercase);
    if (isUpper && that.withShiftRu && state.lang === 'ru') {
      this.buttonEl.innerHTML = that.withShiftRu;
    } else if (isUpper && that.withShiftEn && state.lang === 'en') {
      this.buttonEl.innerHTML = that.withShiftEn;
    }
  }

  drowBtnTitle() {
    let that = this;
    const isUpper = (state.isShiftPress && !state.isUppercase)
      || (!state.isShiftPress && state.isUppercase);
    if (state.lang === 'ru') {
      this.buttonEl.innerHTML = isUpper && this.isLetter
        ? this.titleRu.toUpperCase() : this.titleRu;
    } else if (state.lang === 'en') {
      this.buttonEl.innerHTML = isUpper && this.isLetter
        ? this.titleEn.toUpperCase() : this.titleEn;
    }
    this.changeSymbolWithShift(that);
  }

  highlight() {
    this.buttonEl.classList.add('active');
  }

  deHighlight() {
    this.buttonEl.classList.remove('active');
  }

  selectBtn() {
    this.buttonEl.classList.add('selected');
  }

  deSelectBtn() {
    this.buttonEl.classList.remove('selected');
  }
}
