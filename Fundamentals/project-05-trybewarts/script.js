const inputEmailLogin = document.getElementById('input-email-login');
const inputPassword = document.getElementById('input-password');
const inputButton = document.getElementById('input-button');
const submitButton = document.getElementById('submit-btn');
const inputChecked = document.getElementById('agreement');
const inputTextArea = document.getElementById('textarea');
const spanCounter = document.getElementById('counter');

const inputName = document.getElementById('input-name');
const inputLastName = document.getElementById('input-lastname');
const inputEmail = document.getElementById('input-email');
const inputSelect = document.getElementById('house');
const inputFamily = document.getElementsByName('family');
const inputValuation = document.getElementsByName('content');

let objectForm = {
  Nome: '',
  Email: '',
  Casa: '',
  Família: '',
  Matérias: '',
  Avaliacao: '',
  Observacoes: '',
};

function validateLogin() {
  if (
    inputEmailLogin.value === 'tryber@teste.com'
    && inputPassword.value === '123456'
  ) {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

function addEvent() {
  inputButton.addEventListener('click', validateLogin);
}

addEvent();

function validateSubmit() {
  if (inputChecked.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

inputChecked.addEventListener('click', validateSubmit);

function textAreaUpdate() {
  spanCounter.innerText = 500 - inputTextArea.value.length;
}

inputTextArea.addEventListener('input', textAreaUpdate);

function objectAdd() {
  for (let index = 0; index < inputName.length; index += 1) {
    if (inputName[index].checked) {
      objectForm.Nome = inputName[index].value;
    }
  }
}

objectAdd();

// function resetForms() {
  
// }

// function eventButtonObject {
//   submitButton.addEventListener('click', )
// };



// function nameLast() {
//   inputName.value;
// }

// function returnCheckedInput() {
//   for (let index = 0; index < inputFamily.length; index += 1) {
//     if (inputFamily[index].checked) {
//       const family = `Familía: ${inputFamily[index].value} `;
//       return family;
//     }
//   }
// }

// function newForm() {

// }

// submitButton.addEventListener('click', newForm);
