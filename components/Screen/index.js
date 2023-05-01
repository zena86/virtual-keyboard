import { state } from './../state.js';
import { getCharacter } from '../../utils/utils.js';

export class Screen {
  constructor(className) {
    this.className = className;
    this.screenEl = null;

    state.subscribe('lastKey', () => {
      const character = getCharacter();

      if (character) {
        const isUpper = (state.isShiftPress && !state.isUppercase)
        || (!state.isShiftPress && state.isUppercase);
        const characterToPaste = isUpper
          ? character.toUpperCase()
          : character;
        this.displayСhar(characterToPaste);
      }
    });

    state.subscribe('isBackspace', () => {
      this.removeCharBeforeCursor();
    });

    state.subscribe('isTab', () => {
      this.addTab();
    });

    state.subscribe('isDel', () => {
      this.removeCharAfterCursor();
    });

    state.subscribe('isEnter', () => {
      this.moveToNextLine();
    });

    state.subscribe('isIndent', () => {
      this.displayСhar(' ');
    });

    state.subscribe('isToLeft', () => {
      this.toLeft();
    });

    state.subscribe('isToDown', () => {
      this.toDown();
    });

    state.subscribe('isToRight', () => {
      this.toRight();
    });

    state.subscribe('isToUp', () => {
      this.toUp();
    });
  }

  render() {
    this.screenEl = document.createElement('textarea');
    this.screenEl.className = this.className;
    this.screenEl.setAttribute('rows', 5);
    this.screenEl.setAttribute('cols', 50);
    return this.screenEl;
  }

  displayСhar(val) {
    let cursorPosition = this.screenEl.selectionStart;
    this.screenEl.value = this.screenEl.value.slice(0, cursorPosition)
      + val
      + this.screenEl.value.slice(cursorPosition);
    this.screenEl.focus();
    this.screenEl.selectionStart = cursorPosition + 1;
    this.screenEl.selectionEnd = cursorPosition + 1;
  }

  removeCharBeforeCursor() {
    let cursorPosition = this.screenEl.selectionStart;
    if (cursorPosition > 0) {
      this.screenEl.value = this.screenEl.value.slice(0, cursorPosition - 1)
        + this.screenEl.value.slice(cursorPosition);
      this.screenEl.focus();
      this.screenEl.selectionStart = cursorPosition - 1;
      this.screenEl.selectionEnd = cursorPosition - 1;
    }
  }

  addTab() {
    let cursorPosition = this.screenEl.selectionStart;
    this.screenEl.value = this.screenEl.value.slice(0, cursorPosition)
      + '    '
      + this.screenEl.value.slice(cursorPosition);
    this.screenEl.focus();
    this.screenEl.selectionStart = cursorPosition + 4;
    this.screenEl.selectionEnd = cursorPosition + 4;
  }

  removeCharAfterCursor() {
    let cursorPosition = this.screenEl.selectionStart;
    this.screenEl.value = this.screenEl.value.slice(0, cursorPosition)
      + this.screenEl.value.slice(cursorPosition + 1);
    this.screenEl.focus();
    this.screenEl.selectionStart = cursorPosition;
    this.screenEl.selectionEnd = cursorPosition;
  }

  moveToNextLine() {
    this.displayСhar('\n');
  }

  toLeft() {
    this.displayСhar('←');
  }

  toDown() {
    this.displayСhar('↓');
  }

  toRight() {
    this.displayСhar('→');
  }

  toUp() {
    this.displayСhar('↑');
  }
}
