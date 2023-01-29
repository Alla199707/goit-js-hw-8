import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let getData = localStorage.getItem(STORAGE_KEY);

const formData = {};
reloadPage();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(storageFormData, 500));

function storageFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function reloadPage() {
  if (getData) {
    getData = JSON.parse(getData);
    Object.entries(getData).forEach(([name, value]) => {
      formData[name] = value;
      form.elements[name].value = value;
    });
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  const outputData = new FormData(form);
  outputData.forEach((value, name) => console.log(`${name}:`, value));
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
