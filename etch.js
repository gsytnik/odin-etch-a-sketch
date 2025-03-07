function main(){
    populateGrid(100);

    let canvas = document.querySelector('.canvasContainer');
    let currentColor = '#ffffff';

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


function HandleColorEvent(currentColor) {
    return function setColor(event) {
        let target = event.target;
        if (target.className === 'canvasSquare') {
            target.style.background = currentColor;
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

main()
