function main(){
    populateGrid(16);
    
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
