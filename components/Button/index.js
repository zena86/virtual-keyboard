export class Button {
  constructor(id, className, title) {
    this.id = id;
    this.className = className;
    this.title = title;
  }

  render() {
    const buttonEl = document.createElement('button');
    buttonEl.innerText = this.title;
    buttonEl.id = this.id;
    buttonEl.className = this.className;
    return buttonEl;
  }

  // onMousePress(callback){
  //   buttonEl.addEventListener('bla bla pres', callback);
  // }
}
