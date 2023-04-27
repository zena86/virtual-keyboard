import { Title } from "./../Title/index.js";
import { Screen } from "./../Screen/index.js";
import { Keyboard } from "./../Keyboard/index.js";
import { Description } from "./../Description/index.js";
import { state } from "../../state.js";

export class Content {
  constructor(className) {
    this.className = className;
  }

  render() {
    const contentEl = document.createElement("div");
    contentEl.className = this.className;
    contentEl.appendChild(
      new Title("title", "Виртуальная клавиатура").render()
    );

    const screen = new Screen("screen");
    contentEl.appendChild(screen.render());


    const keyboardPlaceholderEl = document.createElement("div");

    state.subscribe('isUppercase', () => {
      console.log('isUppercase update');
      keyboardPlaceholderEl.innerHTML = '';
      keyboardPlaceholderEl.appendChild(new Keyboard("keyboard", screen).render());
    });

    keyboardPlaceholderEl.appendChild(new Keyboard("keyboard", screen).render());

    contentEl.appendChild(keyboardPlaceholderEl);
    contentEl.appendChild(
      new Description(
        "description",
        "Клавиатура создана в операционной системе Windows"
      ).render()
    );
    contentEl.appendChild(
      new Description(
        "description",
        "Для переключения языка комбинация: левыe ctrl + alt"
      ).render()
    );
    return contentEl;
  }
}
