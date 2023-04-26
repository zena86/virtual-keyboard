export class Screen {
  constructor(className) {
    this.className = className;
  }

  render() {
    const screen = document.createElement("textarea");
    screen.className = this.className;
    screen.setAttribute('rows', 5);
    screen.setAttribute('cols', 50);
    return screen;
  }
}