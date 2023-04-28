import { state } from "./../../state.js";
import { buttons } from "./../../data.js";

export class Button {
  constructor(id, className, titleRu, titleEn, isLetter) {
    this.id = id;
    this.className = className;
    this.titleRu = titleRu;
    this.titleEn = titleEn;
    this.isLetter = isLetter;
    this.buttonEl = null;
  }

  render() {
    this.buttonEl = document.createElement("button");
    this.drowBtnTitle();
    this.buttonEl.id = this.id;
    this.buttonEl.className = this.className;
    this.buttonEl.addEventListener("click", this.onMousePress);
    return this.buttonEl;
  }

  drowBtnTitle() {
    if (state.lang === "ru") {
      this.buttonEl.innerHTML =
        state.isUppercase && this.isLetter
          ? this.titleRu.toUpperCase()
          : this.titleRu;
    } else if (state.lang === "en") {
      this.buttonEl.innerHTML =
        state.isUppercase && this.isLetter
          ? this.titleEn.toUpperCase()
          : this.titleEn;
    }
  }

  updateLang(){
    this.drowBtnTitle();
  }

  highlight() {
    this.buttonEl.classList.add("active");
  }

  deHighlight() {
    this.buttonEl.classList.remove("active");
  }

  onMousePress(e) {
    const id = e.target.getAttribute("id");
    const idNum = +id;
    if (
      (idNum >= 0 && idNum <= 12) ||
      (idNum >= 15 && idNum <= 27) ||
      (idNum >= 30 && idNum <= 40) ||
      (idNum >= 43 && idNum <= 52)
    ) {
      const keyCode = buttons.filter((el) => el.id === id)[0].keyCode;
      state.setProperty("lastKey", {
        keyCode: keyCode,
        isVirtual: true,
      });
    }
  }

  onCtrlPress() {
    state.isCtrlPress = true;
    if(state.isAltPress) {
      this.changeLang();
    }
  }

  onAltPress() {
    state.isAltPress = true;
    if(state.isCtrlPress) {
      this.changeLang();
    }
  }

  changeLang() {
    state.isCtrlPress = false;
    state.isAltPress = false;
    if(state.lang === 'en') {
      state.setProperty('lang', 'ru');
      localStorage.setItem("lang", state.lang);
    }else if(state.lang === 'ru') {
      state.setProperty('lang', 'en');
      localStorage.setItem("lang", state.lang);
    }
  }
}
