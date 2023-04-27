export class Screen {
  constructor(className) {
    this.className = className;
    this.screenEl = null;
  }

  render() {
    this.screenEl = document.createElement("textarea");
    this.screenEl.className = this.className;
    this.screenEl.setAttribute('rows', 5);
    this.screenEl.setAttribute('cols', 50);
    //this.screenEl.addEventListener('keydown', e => {
      // if(e.code !== "Delete") {
      //   e.stopPropagation();
      // }

    //});
    return this.screenEl;
  }

  displayСharacter(val) {
    this.screenEl.value += val;
  }

  deleteLastСharacter() {
    this.screenEl.value = this.screenEl.value.slice(0, -1);
  }

  addTab() {
    this.screenEl.value = this.screenEl.value + '  ';
  }

  addEmpty() {
    this.screenEl.value = this.screenEl.value + '';
  }
}