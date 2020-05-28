window.onload = function virtualKeyboard() {
    let contentDiv = this.document.createElement('div');
    contentDiv.className = "main-content";
    this.document.body.appendChild(contentDiv);

    let desktop = this.document.createElement('div');
    desktop.className="desktop";
    contentDiv.appendChild(desktop);

    let resultWindowTextarea = this.document.createElement('textarea');
    desktop.appendChild(resultWindowTextarea);

    let keyboard = this.document.createElement('div');
    keyboard.className = "keyboard";
    contentDiv.appendChild(keyboard);

    var myArray = [
        ["`", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "=", "Backspace"],
        ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Delete"],
        [{name: "Caps Lock", id: 'CapsLock'}, "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
        [{name: "Shift", id:"ShiftLeft"}, "\\", "Z", "X", "C", "V", "B", "N", "M", ".", ",", "/", {name: "&uarr;", id: 'ArrowUp'}, {name: "Shift", id: "ShiftRight"}],
        [{name: "Ctrl", id: "ControlLeft"}, "Win", {name: "Alt", id: "AltLeft"}, " ", {name: "Alt", id: "AltRight"}, {name: "Ctrl", id: "ControlRight"}, {name: "&#8592;", id: 'ArrowLeft'}, {name: "&darr;", id: 'ArrowDown'}, {name: "&rarr;", id: 'ArrowRight'}]
    ]

    for(let i = 0; i < myArray.length; i++) {
        let rowDiv = this.document.createElement('div');
        rowDiv.className = "rowDiv";
        rowDiv.id = "row" + i;
        keyboard.appendChild(rowDiv);
        let rowElements = myArray[i];
        rowElements.forEach(element => {
            let rowItem = this.document.createElement('li');
            if (typeof element == 'string') {
                rowItem.innerHTML = element;
                if(element.length > 1) {
                    rowItem.id = element;
                } else {
                    rowItem.id = `Key`+ element.toUpperCase()
                }
                
            } else if (typeof element == 'number') {
                rowItem.innerHTML = element;
                rowItem.id = `Digit` + element;
            } else {
                rowItem.innerHTML = element.name;
                rowItem.id = element.id;
            }
            rowDiv.appendChild(rowItem);
        });
    }

    let specialKeysMap = new Map();

    const onEnter = function onEnter() {
        resultWindowTextarea.value += '\n' ;
    }
    specialKeysMap.set('Enter', onEnter);

    const onTab = function onTab() {
        resultWindowTextarea.value += '\t' ;
    }
    specialKeysMap.set('Tab', onTab);

    const onBack = function onBack() {
        let initCursorPosition = resultWindowTextarea.selectionStart;
        let currentText = resultWindowTextarea.value;
        resultWindowTextarea.value = currentText.slice(0, resultWindowTextarea.selectionStart-1) + currentText.slice(resultWindowTextarea.selectionStart, currentText.length);
        resultWindowTextarea.selectionStart = initCursorPosition -1;
        resultWindowTextarea.selectionEnd = initCursorPosition -1;
    }
    specialKeysMap.set('Backspace', onBack);

    const leftArrow = function leftArrow() {
        resultWindowTextarea.selectionEnd -= 1;
    }
    specialKeysMap.set('ArrowLeft', leftArrow);

    const rightArrow = function rightArrow() {
        resultWindowTextarea.selectionStart += 1;
    }
    specialKeysMap.set('ArrowRight', rightArrow);
    
    document.addEventListener('keydown', (event) => {
        console.log(event);
        let pushedKey = event.code;
        let keyTile = document.getElementById(pushedKey);
        keyTile.style.backgroundColor = "coral";
        let text = keyTile.innerText;
        if (specialKeysMap.has(pushedKey)) {
            let action = specialKeysMap.get(pushedKey);
            action();
        } else {
            resultWindowTextarea.value += text;
        }
       // resultWindowTextarea.focus();
        event.preventDefault();
    })

    document.addEventListener('keyup', (event) => {
        console.log(event);
        let pushedKey = event.code;
        let keyTile = document.getElementById(pushedKey);
        keyTile.style.backgroundColor = "lightgoldenrodyellow";
        event.preventDefault();
    })

    

    

    


/*
    let currentItemIndex = 0;
    let ul = document.createElement('ul');
    ul.id="menu-list";
    document.body.appendChild(ul);
    
    var names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let lastItemIndex = names.length - 1;
    
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var li = document.createElement('li');
        li.id = i;
        li.innerText = name;
        ul.appendChild(li);
    } 
    
    document.body.addEventListener('keydown', (event) => {
        switch (event.key) {
            case "ArrowRight":
                ++currentItemIndex;
                changeNextItemColor();
                break;
            case "ArrowLeft":
                --currentItemIndex;
                changePreviousItemColor();
                break;
        }
    });
    
    document.getElementById(currentItemIndex).style.backgroundColor = "red";
    
    function changeNextItemColor() {
        let changeIndextoPink = currentItemIndex -1;
        if (currentItemIndex >= names.length) {
            currentItemIndex = 0;
            changeIndextoPink = lastItemIndex; 
        }
    
        document.getElementById(changeIndextoPink).style.backgroundColor = "pink";
        document.getElementById(currentItemIndex).style.backgroundColor = "red";
    }
    
    function changePreviousItemColor() {
        let changeIndextoPink = currentItemIndex + 1; 
        if (currentItemIndex < 0) {
            changeIndextoPink = 0;
            currentItemIndex = lastItemIndex;
        }
        document.getElementById(changeIndextoPink).style.backgroundColor = "pink";
        document.getElementById(currentItemIndex).style.backgroundColor = "red";
    } */
}