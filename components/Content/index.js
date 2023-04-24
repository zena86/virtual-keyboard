import { Title } from "./../Title/index.js";
import { Screen } from "./../Screen/index.js";
import { Keyboard } from "./../Keyboard/index.js";
import { Description } from "./../Description/index.js";

export class Content {
  constructor(className) {
    this.className = className;
  }

  render() {
    const content = document.createElement("div");
    content.className = this.className;
    content.appendChild(
      new Title("title", "RSS Виртуальная клавиатура").render()
    );
    content.appendChild(new Screen("screen").render());
    content.appendChild(new Keyboard("keyboard").render());
    content.appendChild(
      new Description(
        "description",
        "Клавиатура создана в операционной системе Windows"
      ).render()
    );
    content.appendChild(
      new Description(
        "description",
        "Для переключения языка комбинация: левыe ctrl + alt"
      ).render()
    );
    return content;
  }
}
