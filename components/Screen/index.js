export class Screen {
  constructor(className) {
    this.className = className;
  }

  render() {
    const screen = document.createElement("textarea");
    screen.className = this.className;
    return screen;
  }
}