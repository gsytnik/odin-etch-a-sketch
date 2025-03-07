function main(){

    const input = document.querySelector('#canvasSize');
    const outputValue = document.querySelector('#canvasSizeValue');
    outputValue.textContent = getGridDimensionsFromWidth(input.value);
    let currentGridSize = [input.value];
    const canvas = document.querySelector('.canvasContainer');
    const controlBar = document.querySelector('.controlBar');
    populateGrid(currentGridSize[0]);

    input.addEventListener('input', (event) => {
        outputValue.textContent = getGridDimensionsFromWidth(event.target.value);
    });

    input.addEventListener('mouseup', (event) => {
        if (currentGridSize[0] != parseInt(input.value) 
            && window.confirm(`Changing the canvas size to ${getGridDimensionsFromWidth(input.value)} will remove current drawing. Proceed?`)){

            currentGridSize[0] = parseInt(input.value);
            canvas.replaceChildren();
            populateGrid(currentGridSize[0]);
        } else {
            input.value = currentGridSize[0];
            outputValue.textContent = getGridDimensionsFromWidth(currentGridSize[0]);
        }
    });

    let currentlyDrawing = [1];
    let currentColor = ['#ffffff'];

    let colorEventHandler = HandleColorEvent(currentColor);

    controlBar.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains("action")){
            document.querySelector('.active').classList.remove('active');
            target.classList.add('active');

            currentlyDrawing[0] = target.id === 'draw' ? 1 : 0;
            currentColor[0] = currentlyDrawing[0] ? '#ffffff' : '#274C43';
        }
    })

    canvas.addEventListener('mousedown', (event) => {
        event.preventDefault();
        // console.log('mousedown');
        HandleColorEvent(currentColor)(event);
        canvas.addEventListener('mouseover', colorEventHandler);
    });

    canvas.addEventListener('mouseup', (event) => {
        canvas.removeEventListener('mouseover', colorEventHandler);
        // console.log('mouseup');
    });
    
}


function HandleColorEvent(currentColor) {
    return function setColor(event) {
        let target = event.target;
        if (target.className === 'canvasSquare') {
            target.style.background = currentColor[0];
        }
    }
}


function populateGrid(width) {
    let canvas = document.querySelector('.canvasContainer');

    let height = Math.round(width * 3 / 5);

    for (i = 0; i < height; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'canvasRow');

        for (j = 0; j < width; j++) {
            let square = document.createElement('div');
            square.setAttribute('class', 'canvasSquare');
            row.appendChild(square);
        }

        canvas.appendChild(row);
    }

    return;
}


function getGridDimensionsFromWidth(width) {
    return `${Math.round(parseInt(width) * 3 / 5)} x ${width}`;
}

main()
