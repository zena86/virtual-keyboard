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
    this.buttonEl.id = this.id;
    this.buttonEl.className = this.className;
    this.buttonEl.addEventListener("click", this.onMousePress);
    return this.buttonEl;
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
      /*
      let val = '';
      if(state.lang === 'ru') {
        val = buttons.filter((el) => el.id === id)[0].titleRu;
      } else if(state.lang === 'en') {
        val = buttons.filter((el) => el.id === id)[0].titleEn;
      }
      this.screen.displayСharacter(val);
      */
      const keyCode = buttons.filter((el) => el.id === id)[0].keyCode;
      state.setProperty("lastKey", {
        //code: e.code,
        //key: e.key,
        keyCode: keyCode,
        isVirtual: true,
      });
    }
  }
}
