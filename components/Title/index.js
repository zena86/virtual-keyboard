export class Title {
  constructor(className, text) {
    this.className = className;
    this.text = text;
  }

  render() {
    const title = document.createElement("h1");
    title.className = this.className;
    title.innerText = this.text;
    return title;
  }
}