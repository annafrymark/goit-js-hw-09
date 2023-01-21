const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let randomHex;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', event => {
  event.preventDefault();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  randomHex = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
});

stopBtn.addEventListener('click', event => {
  // event.preventDefault();
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(randomHex);
});
