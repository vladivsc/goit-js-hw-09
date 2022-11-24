import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from './convertMs';

const flatpickr = require('flatpickr');

let timerID = null;
let userDate = null;
const DELAY = 1000;

require('flatpickr/dist/themes/dark.css');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] <= options.defaultDate
      ? (alert('Please choose a date in the future'),
        (refs.startBtn.disabled = true))
      : (refs.startBtn.disabled = false);
    userDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  secondsUsr: document.querySelector('[data-seconds]'),
  minutesUsr: document.querySelector('[data-minutes]'),
  hoursUsr: document.querySelector('[data-hours]'),
  daysUsr: document.querySelector('[data-days]'),
};

window.addEventListener('click', startTimer);

function startTimer(evt) {
  if (evt.target.nodeName !== 'BUTTON') return;

  timerID = setInterval(countTime, DELAY);
}

function countTime(evt) {
  userDate = Date.parse(refs.input.value);
  const differenceInTime = userDate - Date.now();

  let { seconds, minutes, hours, days } = convertTime(differenceInTime);

  if (userDate <= Date.now()) {
    alert('Please, choose date in future');
    clearInterval(timerID);
    refs.input.disabled = false;
  }

  if (differenceInTime <= DELAY) {
    clearInterval(timerID);
    seconds = convertTime(0).seconds;
    minutes = convertTime(0).minutes;
    hours = convertTime(0).hours;
    days = convertTime(0).days;
    refs.input.disabled = false;
  }

  updateCount({ seconds, minutes, hours, days });
}

function convertTime(time) {
  return convertMs(time);
}

function updateCount({ seconds, minutes, hours, days }) {
  refs.secondsUsr.textContent = seconds;
  refs.minutesUsr.textContent = minutes;
  refs.hoursUsr.textContent = hours;
  refs.daysUsr.textContent = days;
}
