import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  showAllResults(
    Number(refs.delayEl.value),
    Number(refs.stepEl.value),
    Number(refs.amountEl.value)
  );
}

function showAllResults(delay, step, amount) {
  for (i = 1, d = delay; i <= amount; i += 1, d += step) {
    showPermiseResult(i, d);
  }
}

function showPermiseResult(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
