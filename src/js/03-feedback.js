// console.log(localStorage);

import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};
const savedValues = localStorage.getItem(STORAGE_KEY);
const savedDataObject = JSON.parse(savedValues);

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form  textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(storageFormData, 500));

reloadPage();

function onFormSubmit(evt) {
  evt.preventDefault();
  //   console.log(evt);
  const savedDatas = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedDatas);
  //   console.log('Отправляем форму');
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function storageFormData(evt) {
  //const message = evt.target.value;
  //   console.log(message);
  // localStorage.setItem(STORAGE_KEY, message);

  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function reloadPage() {
  if (savedValues) {
    refs.input.value = savedDataObject.email || '';
    refs.textarea.value = savedDataObject.message || '';
  }
}
