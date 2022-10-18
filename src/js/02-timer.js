import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  daysEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
  btnStartEl: document.querySelector('button[data-start]'),

  setDisableBtn() {
    this.btnStartEl.setAttribute('disabled', 'true');
  },
  isDisableBtn() {
    return !this.btnStartEl.hasAttribute('disabled');
  },
  setEnableBtn() {
    this.btnStartEl.removeAttribute('disabled');
  },
};

refs.btnStartEl.addEventListener('click', onStartTimer);

let passTime = null;
let nextSelectedTime = null;
let intervalId = null;
const TIME_INTERVAL = 1000;

refs.setDisableBtn();

const selector = '#datetime-picker';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    nextSelectedTime = new Date(selectedDates[0]).getTime();
    if (nextSelectedTime < Date.now()) {
      alert('Please choose a date in the future');
      nextSelectedTime = null;
      if (refs.isDisableBtn()) {
        refs.setDisableBtn();
      }
      return;
    }

    refs.setEnableBtn();
  },
};

flatpickr(selector, options);

function onStartTimer() {
  refs.setDisableBtn();
  const selectedTime = nextSelectedTime;

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  intervalId = setInterval(timeLeft, TIME_INTERVAL, selectedTime);
}

function timeLeft(time) {
  passTime = time - Date.now();

  if (passTime < 0) {
    clearInterval(intervalId);
    intervalId = null;
    return;
  }

  showLeftTime(passTime);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showLeftTime(pt) {
  const { days, hours, minutes, seconds } = convertMs(pt);
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
