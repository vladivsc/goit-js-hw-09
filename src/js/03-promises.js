import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputDelayElm: document.querySelector('[name="delay"]'),
  inputStepElm: document.querySelector('[name="step"]'),
  inputAmountElm: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  let delay = Number(refs.inputDelayElm.value);
  let step = Number(refs.inputStepElm.value);
  let amount = Number(refs.inputAmountElm.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
}

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
