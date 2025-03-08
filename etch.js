function main(){

    const sliderInput = document.querySelector('#canvasSize');
    const outputValue = document.querySelector('#canvasSizeValue');
    const canvas = document.querySelector('.canvasContainer');
    const controlBar = document.querySelector('.controlBar');
    const colorInput = document.querySelector('#colorPicker');

    outputValue.textContent = getGridDimensionsFromWidth(sliderInput.value);
    let currentGridSize = [sliderInput.value];
    populateGrid(currentGridSize[0]);
    populatePalette();

    setSizeSliderEventListeners(sliderInput, outputValue, currentGridSize, canvas);

    let currentlyDrawing = [1];
    let currentColor = [colorInput.value, '#274C43'];

    setupColorPickerEventListeners(colorInput, currentColor, currentlyDrawing);
    setupControlBarEventListeners(controlBar, currentColor, currentlyDrawing, canvas, currentGridSize);

    let colorEventHandler = HandleColorEvent(currentColor);

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


function setupColorPickerEventListeners(colorInput, currentColor, currentlyDrawing){
    colorInput.addEventListener('input', (event) => {
        currentlyDrawing[0] ? currentColor[0] = event.target.value : currentColor[1] = event.target.value;
    });
}


function setupControlBarEventListeners(controlBar, currentColor, currentlyDrawing, canvas, currentGridSize) {

    controlBar.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains("action")){
            handleActionButtonEvent(target, currentColor, currentlyDrawing, canvas, currentGridSize);
        }

        if (target.classList.contains('paletteSquare')){
            target.style.background = currentlyDrawing[0] ? currentColor[0] : currentColor[1];
        }
    });

    fancifyButtons();

}


function handleActionButtonEvent(target, currentColor, currentlyDrawing, canvas, currentGridSize){

    let swapped = 
        ((currentlyDrawing[0] && target.id === 'erase')
        || (!currentlyDrawing[0] && target.id === 'draw') 
    );
    
    if (swapped) {
        [currentColor[0], currentColor[1]] = [currentColor[1], currentColor[0]];
        currentlyDrawing[0] = currentlyDrawing[0] ? 0 : 1;
        document.querySelector('.active').classList.remove('active');
        target.classList.add('active');
    }

    if (target.id == 'clear' && window.confirm(`This will erase the entire canvas. Proceed?`)){
        document.querySelector('.active').classList.remove('active');
        target.classList.add('active');
        canvas.replaceChildren();
        populateGrid(currentGridSize[0]);
    }
}


function fancifyButtons(){
    let translatedClasses = [];

    document.addEventListener('mousedown', (event) => {
        let target = event.target;
        if (target.classList.contains("action")){
            event.preventDefault();
            event.target.style.transform = 'translateY(4px)';
            translatedClasses.push(target);
        }
    });

    document.addEventListener('mouseup', (event) => {
        for (element of translatedClasses) {
            element.style.transform = 'translateY(0px)';
        }
    });
}


function setSizeSliderEventListeners(input, outputValue, currentGridSize, canvas){
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


function populatePalette() {
    let palette = document.querySelector('.palette');

    for (j = 0; j < 2; j++) {
        let div = document.createElement('div');
        for (i = 0; i < 4; i++) {
            let paletteSquare = document.createElement('div');
            paletteSquare.setAttribute('class', 'paletteSquare');
            div.appendChild(paletteSquare);
        }
        palette.appendChild(div);
    }

    return;
}


function getGridDimensionsFromWidth(width) {
    return `${Math.round(parseInt(width) * 3 / 5)} x ${width}`;
}

main()
