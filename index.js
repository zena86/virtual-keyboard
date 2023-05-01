import { Content } from './components/Content/index.js';
import { state } from 'https://zena86.github.io/virtual-keyboard/state.js';

function updateSettingsFromStorage() {
  if (localStorage.getItem('lang')) {
    state.lang = localStorage.getItem('lang');
  }
}
updateSettingsFromStorage();

const body = document.querySelector('body');
const content = new Content('content');
body.append(content.render());
