import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
startBtn.disabled = true;

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= new Date().getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const fp = flatpickr(input, options);

const timer = () => {
  startBtn.disabled = true;

  const countdown = setInterval(() => {
    let timeRemaining = fp.selectedDates[0].getTime() - new Date().getTime();
    let startCountdown = convertMs(timeRemaining);
    //add leading zero
    dataDays.textContent = addLeadingZero(startCountdown.days);
    dataHours.textContent = addLeadingZero(startCountdown.hours);
    dataMinutes.textContent = addLeadingZero(startCountdown.minutes);
    dataSeconds.textContent = addLeadingZero(startCountdown.seconds);
    if (startCountdown.seconds < 1) {
      clearInterval(countdown);
    }
  }, 1000);
};

startBtn.addEventListener('click', timer);
