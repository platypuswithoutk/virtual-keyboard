window.onload = function virtualKeyboard() {
  const contentDiv = this.document.createElement('div');
  contentDiv.className = 'main-content';
  this.document.body.appendChild(contentDiv);

  const desktop = this.document.createElement('div');
  desktop.className = 'desktop';
  contentDiv.appendChild(desktop);

  const resultWindowTextarea = this.document.createElement('textarea');
  desktop.appendChild(resultWindowTextarea);

  const keyboard = this.document.createElement('div');
  keyboard.className = 'keyboard';
  contentDiv.appendChild(keyboard);

  const myArray = [
    ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', { name: 'Del', id: 'Delete' }],
    [{ name: 'Caps Lock', id: 'CapsLock' }, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
    [{ name: 'Shift', id: 'ShiftLeft' }, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', ',', '/', { name: '&uarr;', id: 'ArrowUp' }, { name: 'Shift', id: 'ShiftRight' }],
    [{ name: 'Ctrl', id: 'ControlLeft' }, { name: 'Win', id: 'MetaLeft' }, { name: 'Alt', id: 'AltLeft' }, { name: ' ', id: 'Space' }, { name: 'Alt', id: 'AltRight' }, { name: '&#8592;', id: 'ArrowLeft' }, { name: '&darr;', id: 'ArrowDown' }, { name: '&rarr;', id: 'ArrowRight' }, { name: 'Ctrl', id: 'ControlRight' }],
  ];

  for (let i = 0; i < myArray.length; i += 1) {
    const rowDiv = this.document.createElement('div');
    rowDiv.className = 'rowDiv';
    rowDiv.id = `row${i}`;
    keyboard.appendChild(rowDiv);
    const rowElements = myArray[i];
    rowElements.forEach((element) => {
      const rowItem = this.document.createElement('li');
      if (typeof element === 'string') {
        rowItem.innerHTML = element;
        if (element.length > 1) {
          rowItem.id = element;
        } else {
          rowItem.id = `Key${element.toUpperCase()}`;
        }
      } else if (typeof element === 'number') {
        rowItem.innerHTML = element;
        rowItem.id = `Digit${element}`;
      } else {
        rowItem.innerHTML = element.name;
        rowItem.id = element.id;
      }
      rowDiv.appendChild(rowItem);
    });
  }

  const specialKeysMap = new Map();

  const onEnter = function onEnter() {
    resultWindowTextarea.value += '\n';
  };
  specialKeysMap.set('Enter', onEnter);

  const onTab = function onTab() {
    resultWindowTextarea.value += '\t';
  };
  specialKeysMap.set('Tab', onTab);

  const onBack = function onBack() {
    const initCursorPosition = resultWindowTextarea.selectionStart;
    const currentText = resultWindowTextarea.value;
    resultWindowTextarea.value = currentText.slice(0, resultWindowTextarea.selectionStart - 1)
    + currentText.slice(resultWindowTextarea.selectionStart, currentText.length);
    resultWindowTextarea.selectionStart = initCursorPosition - 1;
    resultWindowTextarea.selectionEnd = initCursorPosition - 1;
  };
  specialKeysMap.set('Backspace', onBack);

  const onDel = function onDel() {
    const initCursorPosition = resultWindowTextarea.selectionStart;
    const currentText = resultWindowTextarea.value;
    resultWindowTextarea.value = currentText.slice(0, resultWindowTextarea.selectionStart)
    + currentText.slice(resultWindowTextarea.selectionStart + 1, currentText.length);
    resultWindowTextarea.selectionStart = initCursorPosition;
    resultWindowTextarea.selectionEnd = initCursorPosition;
  };
  specialKeysMap.set('Delete', onDel);

  const leftArrow = function leftArrow() {
    resultWindowTextarea.selectionEnd -= 1;
  };
  specialKeysMap.set('ArrowLeft', leftArrow);

  const rightArrow = function rightArrow() {
    resultWindowTextarea.selectionStart += 1;
  };
  specialKeysMap.set('ArrowRight', rightArrow);

  const CtrLeft = function CtrLeft() {};
  specialKeysMap.set('ControlLeft', CtrLeft);

  const CtrRight = function CtrRight() {};
  specialKeysMap.set('ControlRight', CtrRight);

  const AltLeft = function AltLeft() {};
  specialKeysMap.set('AltLeft', AltLeft);

  const AltRight = function AltRight() {};
  specialKeysMap.set('AltRight', AltRight);

  const ShiftLeft = function ShiftLeft() {};
  specialKeysMap.set('ShiftLeft', ShiftLeft);

  const ShiftRight = function ShiftRight() {};
  specialKeysMap.set('ShiftRight', ShiftRight);

  const Caps = function Caps() {};
  specialKeysMap.set('CapsLock', Caps);

  document.addEventListener('keydown', (event) => {
    const pushedKey = event.code;
    const keyTile = document.getElementById(pushedKey);
    keyTile.style.backgroundColor = 'coral';
    const text = keyTile.innerText;
    if (specialKeysMap.has(pushedKey)) {
      const action = specialKeysMap.get(pushedKey);
      action();
    } else {
      resultWindowTextarea.value += text;
    }
    resultWindowTextarea.focus();
    event.preventDefault();
  });

  document.addEventListener('keyup', (event) => {
    const pushedKey = event.code;
    const keyTile = document.getElementById(pushedKey);
    keyTile.style.backgroundColor = 'lightgoldenrodyellow';
    event.preventDefault();
  });
};
