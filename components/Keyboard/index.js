import { Button } from './../Button/index.js';
import { buttons } from './../../data.js';

export class Keyboard {
  constructor(className) {
    this.className = className;
  }

  render() {
    const keyboardEl = document.createElement("div");
    keyboardEl.className = this.className;
    buttons.forEach(btn => {
      keyboardEl.appendChild(new Button(btn.id, btn.className, btn.title).render());
    })
    return keyboardEl;
  }
}