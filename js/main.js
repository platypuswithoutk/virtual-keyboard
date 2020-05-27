window.onload = function virtualKeyboard() {
    let contentDiv = this.document.createElement('div');
    contentDiv.className = "main-content";
    this.document.body.appendChild(contentDiv);

    let desktop = this.document.createElement('div');
    desktop.className="desktop";
    contentDiv.appendChild(desktop);

    let keyboard = this.document.createElement('div');
    keyboard.className = "keyboard";
    contentDiv.appendChild(keyboard);

    var myArray = [
        ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
        ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "p", "[", "]", "\\", "Del"],
        ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
        ["Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ".", ",", "/", "	&uarr;", "Shift"],
        ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "&#8592;", "&darr;", "&rarr;"]
    ]

    for(let i = 0; i < myArray.length; i++) {
        let rowDiv = this.document.createElement('div');
        rowDiv.className = "rowDiv";
        rowDiv.id = "row" + i;
        keyboard.appendChild(rowDiv);
        let rowElements = myArray[i];
        rowElements.forEach(element => {
            let rowItem = this.document.createElement('li');
            rowItem.innerHTML = element;
            rowItem.id = element;
            rowDiv.appendChild(rowItem);
        });
    }

    let mappedIds = new Map()
    mappedIds.set('Control', 'Ctrl') 
    mappedIds.set()
    
    this.document.body.addEventListener('keydown', (event) => {
        this.console.log(event);
        let pushedKey = event.key;
        let keyTile;
        if (mappedIds.has(pushedKey)) {
            keyTile = document.getElementById(mappedIds.get(pushedKey));
        } else {
            keyTile = document.getElementById(pushedKey);
        }
        keyTile.style.backgroundColor = "coral";

        let eventCode = event.code;
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