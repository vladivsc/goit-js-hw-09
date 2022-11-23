function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(() => changeBodyColor(), 1000);

  refs.startBtn.setAttribute('disabled', 'disabled');
}

function onStopBtnClick() {
  clearInterval(timerId);

  refs.startBtn.removeAttribute('disabled');
}

function changeBodyColor() {
  const randomColor = getRandomHexColor();

  refs.body.style.backgroundColor = randomColor;
}
