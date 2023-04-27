import { state } from "./../../state.js";

export class Button {
  constructor(id, className, titleRu, titleEn, isLetter) {
    this.id = id;
    this.className = className;
    this.titleRu = titleRu;
    this.titleEn = titleEn;
    this.isLetter = isLetter;
  }

  render() {
    const buttonEl = document.createElement('button');
    if(state.lang === 'ru') {
      buttonEl.innerHTML = (state.isUppercase && this.isLetter) ? this.titleRu.toUpperCase() : this.titleRu;
    }else if (state.lang === 'en'){
      buttonEl.innerHTML = (state.isUppercase && this.isLetter) ? this.titleEn.toUpperCase() : this.titleEn;
    }
    buttonEl.id = this.id;
    buttonEl.className = this.className;
    return buttonEl;
  }

  // onMousePress(callback){
  //   buttonEl.addEventListener('bla bla pres', callback);
  // }
}
