const ol = document.querySelector('ol');
const color = 'rgb(128, 128, 128)';

const removeSelect = () => {
  const liSelectTest = document.querySelectorAll('li');
  liSelectTest.forEach((task) => {
    const li = task;
    li.style.backgroundColor = '';
  });
};

const liEventClick = (event) => {
  removeSelect();
  const evento = event.target;
  evento.style.backgroundColor = color;
};

const liDblClick = (event) => {
  if (event.target.className === 'completed') {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
};

const clickButton = () => {
  const btn = document.querySelector('#criar-tarefa');
  btn.addEventListener('click', () => {
    const input = document.querySelector('#texto-tarefa');
    const li = document.createElement('li');
    li.innerText = input.value;
    li.addEventListener('click', liEventClick);
    li.addEventListener('dblclick', liDblClick);
    ol.appendChild(li);
    input.value = '';
  });
};

clickButton();

const resetTasks = () => {
  const resetButton = document.querySelector('#apaga-tudo');
  resetButton.addEventListener('click', () => {
    ol.innerHTML = '';
  });
};

resetTasks();

const removeDone = () => {
  const btnCompleted = document.querySelector('#remover-finalizados');
  btnCompleted.addEventListener('click', () => {
    const li = document.querySelectorAll('li');
    li.forEach((task) => {
      task.classList.remove('completed');
    });
  });
};

removeDone();

const saveTasks = () => {
  const btnSave = document.querySelector('#salvar-tarefas');
  btnSave.addEventListener('click', () => {
    localStorage.setItem('lista-tarefas', ol.innerHTML);
  });
};

saveTasks();

const moveButtonUp = () => {
  const moveUp = document.querySelector('#mover-cima');
  moveUp.addEventListener('click', () => {
    const selectLi = document.querySelectorAll('li');
    selectLi.forEach((element, index) => {
      if (element.style.backgroundColor === color && index > 0) {
        ol.insertBefore(element, element.previousSibling);
      }
    });
  });
};

moveButtonUp();

const moveButtonDown = () => {
  const moveDown = document.querySelector('#mover-baixo');
  moveDown.addEventListener('click', () => {
    const selectLi = document.querySelectorAll('li');
    selectLi.forEach((element, index, array) => {
      if (element.style.backgroundColor === color && index < (array.length - 1)) {
        ol.insertBefore(element, element.nextSibling.nextSibling);
      }
    });
  });
};

moveButtonDown();

const removeBackground = () => {
  const btnBackground = document.querySelector('#remover-selecionado');
  btnBackground.addEventListener('click', () => {
    const liAll = document.querySelectorAll('li');
    liAll.forEach((elemento) => {
      if (elemento.style.backgroundColor === 'rgb(128, 128, 128)') {
        elemento.remove();
      }
    });
  });
};

removeBackground();

const addEventAfterOnload = () => {
  const selectLi = document.querySelectorAll('li');
  selectLi.forEach((current) => {
    current.addEventListener('click', liEventClick);
    current.addEventListener('dblclick', liDblClick);
  });
};

window.onload = () => {
  ol.innerHTML = localStorage.getItem('lista-tarefas');
  addEventAfterOnload();
};
