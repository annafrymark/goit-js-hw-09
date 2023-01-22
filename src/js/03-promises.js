import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const submitBtn = form.querySelector('button[type=submit]');
const firstDelay = form.delay;
const delayStep = form.step;
const amount = form.amount;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

submitBtn.addEventListener('click', event => {
  event.preventDefault();
  let delay = parseInt(firstDelay.value);
  for (let i = 1; i <= Number(amount.value); i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay = delay + parseInt(delayStep.value);
  }
});
