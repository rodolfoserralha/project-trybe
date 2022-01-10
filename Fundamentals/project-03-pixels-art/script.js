const generateRandomColor = () => {
  const num1 = Math.floor(Math.random() * 256);
  const num2 = Math.floor(Math.random() * 256);
  const num3 = Math.floor(Math.random() * 256);
  return `rgb(${num1}, ${num2}, ${num3})`;
};

const createDivColor = () => {
  const father = document.querySelector('#color-palette');
  const create = document.createElement('div');
  create.style.border = '1px solid black';
  create.className = 'color';
  father.appendChild(create);
}

const create4divs = () => {
  for (let index = 0; index < 4; index += 1) {
    createDivColor();
    const array = ['black', 'blue', 'red', 'yellow']
    const findColor = document.querySelectorAll('.color');
    findColor[index].style.backgroundColor = array[index];
  }
}

create4divs()

const blackColor = () => {
  const firstColor = document.querySelector('.color')
  firstColor.classList.add('selected');
}

blackColor();

const createBoard = (num) => {
  for (let index = 0; index < num; index += 1) {
    const board = document.querySelector('#pixel-board');
    const createPixel = document.createElement('div');
    createPixel.className = 'pixel';
    createPixel.style.backgroundColor = 'white';
    board.appendChild(createPixel);
  }
}

createBoard(25);

const removeSelected = () => {
  const colors2 = document.querySelectorAll('.color');
  colors2.forEach((color) => {
    color.classList.remove('selected')
  })
}
const addEventToPalette = () => {
  const colors = document.querySelectorAll('.color');
  console.log(colors);
  colors.forEach((color) => {
    color.addEventListener('click', (event) => {  
      removeSelected()
      event.target.classList.add('selected');
    })
  })
}

addEventToPalette();

const paintPixel = () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.addEventListener('click', (event) => {
      const selected = document.querySelector('.selected').style.backgroundColor;
      event.target.style.backgroundColor = selected;
    })
  })
}

paintPixel();

const clearButton = () => {
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', () => {
    const allPixels = document.querySelectorAll('.pixel');
    allPixels.forEach((pixel) => {
      pixel.style.backgroundColor = 'white';
    })
  })
}

clearButton();

const generateBoard = () => {
  const vqv = document.querySelector('#generate-board');
  vqv.addEventListener('click', () => {
    const input = document.getElementById('board-size').value;
    const board = document.querySelector('#pixel-board');
    if (!input) alert('Board inválido!')
    board.innerHTML = '';
    board.style.width = `${(42 * input)}px`;
    for (let index = 0; index < (input ** 2); index += 1) {
      const board = document.querySelector('#pixel-board');
      const createPixel = document.createElement('div');
      createPixel.className = 'pixel';
      createPixel.style.backgroundColor = 'white';
      board.appendChild(createPixel);
      paintPixel();
    }
  })
}

generateBoard();

const generate3colors = () => {
  const colors = document.querySelectorAll('.color');
  colors[1].style.backgroundColor = generateRandomColor();
  colors[2].style.backgroundColor = generateRandomColor();
  colors[3].style.backgroundColor = generateRandomColor();
}

generate3colors();