export class Description {
  constructor(className, text) {
    this.className = className;
    this.text = text;
  }

  render() {
    const desc = document.createElement('p');
    desc.className = this.className;
    desc.innerText = this.text;
    return desc;
  }
}