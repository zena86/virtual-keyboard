import { Button } from "./../Button/index.js";
import { buttons } from "./../../data.js";
import { state } from "./../../state.js";

export class Keyboard {
  constructor(className, screen) {
    this.className = className;
    this.screen = screen;
    this.keys = [];
    state.subscribe("lastKey", () => {
      this.onKeyPress();
    });

    state.subscribe('isUppercase', () => {
      console.log('isUppercase update');
    });
  }

  onKeyPress() {
    let valArr = null;
    let val = "";
    valArr = buttons.filter((el) => el.keyCode === state.lastKey.keyCode);
    if(valArr.length === 0) {
      return;
    }

    if(state.lang === "ru") {
      val = valArr[0].titleRu;
    } else if (state.lang === "en") {
      val = valArr[0].titleEn;
    }
    this.screen.displayСharacter(val);
  }

  render() {
    console.log("render keyboarfd");
    const keyboardEl = document.createElement("div");
    keyboardEl.className = this.className;
    this.keys.length = 0;
    buttons.forEach((btn) => {
      let button = new Button(
        btn.id,
        btn.className,
        btn.titleRu,
        btn.titleEn,
        btn.isLetter
      );
      this.keys.push(button);
      let btnEl = button.render();
      keyboardEl.appendChild(btnEl);

      // btnEl.addEventListener("click", (e) => {
      //   const id = e.target.getAttribute("id");
      //   const idNum = +id;
      //   if (
      //     (idNum >= 0 && idNum <= 12) ||
      //     (idNum >= 15 && idNum <= 27) ||
      //     (idNum >= 30 && idNum <= 40) ||
      //     (idNum >= 43 && idNum <= 52)
      //   ) {
      //     let val = '';
      //     if(state.lang === 'ru') {
      //       val = buttons.filter((el) => el.id === id)[0].titleRu;
      //     } else if(state.lang === 'en') {
      //       val = buttons.filter((el) => el.id === id)[0].titleEn;
      //     }
      //     this.screen.displayСharacter(val);
      //   }
      // });
    });
    this.handleKeyDown();
    this.handleKeyUp();
    return keyboardEl;
  }

  getKeyId(e){
    const buttonData = buttons.filter((x) => x.keyCode === e.keyCode);
    if(buttonData && buttonData.length === 1){
      return buttonData[0].id;
    }else if(e.code === 'ShiftLeft') {
      return '42';
    }else if(e.code === 'ShiftRight') {
      return '54';
    }else if(e.code === 'ControlLeft') {
      return '55';
    }else if(e.code === 'ControlRight') {
      return '63';
    }else if(e.code === 'AltLeft') {
      return '57';
    }else if(e.code === 'AltRight') {
      return '59';
    }
  }

  handleKeyUp() {
    const keyUpHandle = (e) => {
      const keyId = this.getKeyId(e);

      let button = this.keys.find((x) => x.id === keyId);
      if(button) {
        button.deHighlight();
      }
    };
    document.removeEventListener("keyup", keyUpHandle);
    document.addEventListener("keyup", keyUpHandle);
  }

  handleKeyDown() {
    const keyDownHandle = (e) => {
      e.preventDefault();
      state.setProperty("lastKey", {
        code: e.code,
        key: e.key,
        keyCode: e.keyCode,
        isVirtual: false,
      });

      const keyId = this.getKeyId(e);
      let button = this.keys.find((x) => x.id === keyId);
      if(button) {
        console.log('44');
        button.highlight();
      }
      //state.code = e.code;
      //state.key = e.key;
      // console.log(state.code);
      // console.log(state.key);
      // console.log(e.keyCode);

      const prevUppecaseState = state.isUppercase;
      const currUppecaseState = e.getModifierState("CapsLock");
      if (currUppecaseState !== prevUppecaseState) {
        console.log("change caps");
        this.screen.addEmpty();
        state.setProperty("isUppercase", currUppecaseState);
      }

      /*
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
      */
      e.stopPropagation();
    };

    document.removeEventListener("keydown", keyDownHandle);
    document.addEventListener("keydown", keyDownHandle);
  }
}
