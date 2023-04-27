import { Button } from "./../Button/index.js";
import { buttons } from "./../../data.js";
import { state } from "./../../state.js";

export class Keyboard {
  constructor(className, screen) {
    this.className = className;
    this.screen = screen;
  }

  render() {
    console.log("render keyboarfd");
    const keyboardEl = document.createElement("div");
    keyboardEl.className = this.className;
    buttons.forEach((btn) => {
      let btnEl = new Button(
        btn.id,
        btn.className,
        btn.titleRu,
        btn.titleEn,
        btn.isLetter
      ).render();
      keyboardEl.appendChild(btnEl);
      btnEl.addEventListener("click", (e) => {
        const id = e.target.getAttribute("id");
        const idNum = +id;
        if (
          (idNum >= 0 && idNum <= 12) ||
          (idNum >= 15 && idNum <= 27) ||
          (idNum >= 30 && idNum <= 40) ||
          (idNum >= 43 && idNum <= 52)
        ) {
          let val = '';
          if(state.lang === 'ru') {
            val = buttons.filter((el) => el.id === id)[0].titleRu;
          } else if(state.lang === 'en') {
            val = buttons.filter((el) => el.id === id)[0].titleEn;
          }
          this.screen.displayСharacter(val);
        }
      });
    });
    this.handleKeyDown();
    return keyboardEl;
  }

  handleKeyDown() {
    const keyDownHandle = (e) => {
      e.preventDefault();
      state.code = e.code;
      state.key = e.key;
      console.log(state.code);
      console.log(state.key);
      console.log(e.keyCode);

      const prevUppecaseState = state.isUppercase;
      const currUppecaseState = e.getModifierState("CapsLock");
      if (currUppecaseState !== prevUppecaseState) {
        console.log("change caps");
        this.screen.addEmpty();
        state.setProperty("isUppercase", currUppecaseState);
      }

      if (state.code === "Backspace") {
        this.screen.deleteLastСharacter();
      } else if (state.code === "Tab") {
        this.screen.addTab();
      } else if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 186 && e.keyCode <= 192) ||
        (e.keyCode >= 219 && e.keyCode <= 222) ||
        (e.keyCode >= 65 && e.keyCode <= 90)
      ) {
        this.screen.displayСharacter(e.key);
      }
      e.stopPropagation();
    };

    document.removeEventListener("keydown", keyDownHandle);
    document.addEventListener("keydown", keyDownHandle);
  }
}
