import { Button } from './../Button/index.js';
import { buttons } from './../../data.js';
import { state } from './../../state.js';
import {
  changeStateOnKeyPress,
  getButtonData,
  getKeyId,
  changeStateOnCaps,
  changeStateOnEnter,
  onShiftPress,
  onIndentPress
} from '../../utils/utils.js';
import { onAltPress, onCtrlPress } from '../../utils/switchLang.js';

export class Keyboard {
  constructor(className, screen) {
    this.className = className;
    this.screen = screen;
    this.keys = [];

    state.subscribe('isUppercase', () => {
      this.keys.forEach((key) => key.drowBtnTitle());
      const keyCaps = this.keys.find((key) => key.id === '29');
      if (state.isUppercase) {
        keyCaps.selectBtn();
      } else {
        keyCaps.deSelectBtn();
      }
    });

    state.subscribe('lang', () => {
      this.keys.forEach((key) => key.drowBtnTitle());
    });

    state.subscribe('isShiftPress', () => {
      this.keys.forEach((key) => key.drowBtnTitleWithShift());
    });
  }

  render() {
    const keyboardEl = document.createElement('div');
    keyboardEl.className = this.className;
    this.keys.length = 0;
    buttons.forEach((btn) => {
      let button = new Button(
        btn.id,
        btn.className,
        btn.titleRu,
        btn.titleEn,
        btn.isLetter,
        btn.withShiftRu,
        btn.withShiftEn
      );
      this.keys.push(button);
      let btnEl = button.render();
      keyboardEl.appendChild(btnEl);
    });
    this.handleKeyDown();
    this.handleKeyUp();
    return keyboardEl;
  }

  handleKeyDown() {
    const keyDownHandle = (e) => {
      e.preventDefault();
      changeStateOnKeyPress(e);

      const buttonData = getButtonData(e, buttons);
      const keyId = getKeyId(e, buttonData);
      let button = this.keys.find((x) => x.id === keyId);
      if (button) {
        button.highlight();
      } else {
        return;
      }
      if (button.id === '55' || button.id === '59') {
        onCtrlPress();
      } else if (button.id === '57' || button.id === '63') {
        onAltPress();
      } else if (button.id === '13') {
        this.screen.removeCharBeforeCursor();
      } else if (button.id === '14') {
        this.screen.addTab();
      } else if (button.id === '28') {
        this.screen.removeCharAfterCursor();
      } else if (button.id === '29') {
        changeStateOnCaps();
      } else if (button.id === '41') {
        changeStateOnEnter();
      } else if (button.id === '42' || button.id === '54') {
        onShiftPress();
      } else if (button.id === '58') {
        onIndentPress();
      } else if (button.id === '60') {
        this.screen.toLeft();
      } else if (button.id === '61') {
        this.screen.toDown();
      } else if (button.id === '62') {
        this.screen.toRight();
      } else if (button.id === '53') {
        this.screen.toUp();
      }
      e.stopPropagation();
    };

    document.removeEventListener('keydown', keyDownHandle);
    document.addEventListener('keydown', keyDownHandle);
  }

  handleKeyUp() {
    const keyUpHandle = (e) => {
      const buttonData = getButtonData(e, buttons);
      const keyId = getKeyId(e, buttonData);
      let button = this.keys.find((x) => x.id === keyId);
      if (button) {
        button.deHighlight();
      }
      if (e.key === 'Control') {
        state.setProperty('isCtrlPress', false);
      }
      if (e.key === 'Alt') {
        state.setProperty('isAltPress', false);
      }
      if (e.key === 'Shift') {
        state.setProperty('isShiftPress', false);
      }
    };
    document.removeEventListener('keyup', keyUpHandle);
    document.addEventListener('keyup', keyUpHandle);
  }
}
