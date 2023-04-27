export class Description {
  constructor(className, text) {
    this.className = className;
    this.text = text;
  }

  render() {
    const descEl = document.createElement('p');
    descEl.className = this.className;
    descEl.innerText = this.text;
    return descEl;
  }
}