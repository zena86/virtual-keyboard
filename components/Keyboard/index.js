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

    state.subscribe("isUppercase", () => {
      console.log("isUppercase update");
    });

    state.subscribe("lang", () => {
      this.keys.forEach((key) => key.updateLang());
    });
  }

  onKeyPress() {
    let valArr = null;
    let val = "";
    valArr = buttons.filter((el) => el.keyCode === state.lastKey.keyCode);
    if (valArr.length === 0) {
      return;
    }
    let keyId = valArr[0].id;
    if (
      (keyId >= 0 && keyId <= 12) ||
      (keyId >= 15 && keyId <= 27) ||
      (keyId >= 30 && keyId <= 40) ||
      (keyId >= 43 && keyId <= 52)
    ) {
      if (state.lang === "ru") {
        val = valArr[0].titleRu;
      } else if (state.lang === "en") {
        val = valArr[0].titleEn;
      }
      this.screen.displayСharacter(val);
    }
  }

  render() {
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
    });
    this.handleKeyDown();
    this.handleKeyUp();
    return keyboardEl;
  }

  getKeyId(e) {
    const buttonData = buttons.filter((x) => x.keyCode === e.keyCode);
    if (buttonData && buttonData.length === 1) {
      return buttonData[0].id;
    } else if (e.code === "ShiftLeft") {
      return "42";
    } else if (e.code === "ShiftRight") {
      return "54";
    } else if (e.code === "ControlLeft") {
      return "55";
    } else if (e.code === "ControlRight") {
      return "63";
    } else if (e.code === "AltLeft") {
      return "57";
    } else if (e.code === "AltRight") {
      return "59";
    }
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
      if (button) {
        button.highlight();
      }

      //Change language
      if (button.id === "55") {
        button.onCtrlPress();
      } else if (button.id === "57") {
        button.onAltPress();
      }

      // const prevUppecaseState = state.isUppercase;
      // const currUppecaseState = e.getModifierState("CapsLock");
      // if (currUppecaseState !== prevUppecaseState) {
      //   console.log("change caps");
      //   this.screen.addEmpty();
      //   state.setProperty("isUppercase", currUppecaseState);
      // }

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

  handleKeyUp() {
    const keyUpHandle = (e) => {
      const keyId = this.getKeyId(e);

      let button = this.keys.find((x) => x.id === keyId);
      if (button) {
        button.deHighlight();
      }
      //Change lang
      state.isCtrlPress = false;
      state.isAltPress = false;
    };
    document.removeEventListener("keyup", keyUpHandle);
    document.addEventListener("keyup", keyUpHandle);
  }
}


