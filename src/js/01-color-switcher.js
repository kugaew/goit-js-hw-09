const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};
let intervalId = null;
const INTERVAL_TIMER = 1000;

refs.btnStartEl.addEventListener('click', onStartChangeBodyBC);
refs.btnStopEl.addEventListener('click', onStopChangeBodyBC);

function onStartChangeBodyBC() {
  refs.btnStartEl.setAttribute('disabled', 'true');
  intervalId = setInterval(setBodyBC, INTERVAL_TIMER);
}

function onStopChangeBodyBC() {
  refs.btnStartEl.removeAttribute('disabled');
  clearInterval(intervalId);
  intervalId = null;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBodyBC() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
}
