
//const rainbowColors = ["(255,0,0)","(255,127,0)","(255,255,0)","(0,255,0)","(0,0,255)","(75,0,130)","(143,0,255)"]
let rainbowColors=makeColorGradient(.3,.3,.3,0,2,4);
let currentColor = 0;
let gridLength =16;
let body = document.querySelector('body');
let changedGrid = false;

//
//MAKE GRID
//
let grid = document.querySelector('.grid-container');
makeGrid(grid)

function makeGrid(myGrid){
    //for function 16 times:
    //makes div with data-order="[order]" class="grid-box"
    //insert inside grid
    for (let i=0;i<(gridLength*gridLength);i++){
        //Initialize squares
        let newDiv = document.createElement('div');
        newDiv.style.backgroundColor = 'white';
        newDiv.style.width = `${100/gridLength}%`;
        newDiv.style.height = `${100/gridLength}%`;

        //Add Attributes
        newDiv.classList.add('grid-box');
        newDiv.setAttribute('data-order', `${i}`);
        newDiv.setAttribute('data-over', 'False');

        //Add Event Listeners
        newDiv.addEventListener('mouseover', colorize);
        newDiv.addEventListener('mouseout', deColorize);

        //Append Div to Grid
        myGrid.appendChild(newDiv);
    }
}

function colorize(event){
    event.target.classList.remove('turnWhite');
    if (event.target.getAttribute('data-over')=='False'){
        event.target.setAttribute('data-over','True');
        event.target.style.backgroundColor = `rgb${rainbowColors[currentColor]}`; 
        currentColor=(currentColor+1)%rainbowColors.length; 
    }
}

function deColorize(event){
    event.target.setAttribute('data-over','False');
    event.target.classList.add('turnWhite');
}


//
//CHANGE GRID
//


function changeGrid(){
    sliderInput.innerHTML = slider.value;
    gridLength=slider.value;
    //Removing old Grid
    body.removeChild(grid);
    //Making new grid
    changedGrid=true;
    grid = document.createElement('div');
    grid.classList.add('grid-container');
    makeGrid(grid);
    body.appendChild(grid);
    
}


//
//SLIDER
//
let slider = document.querySelector('#gridSize');
const sliderInput = document.querySelector('#sliderInput');
slider.addEventListener('input', changeGrid);




//
//Color Function
//
function makeColorGradient(frequency1, frequency2, frequency3,
    phase1, phase2, phase3,
    center, width, len){
    let colorArray=[]
    if (center == undefined)   center = 128;
    if (width == undefined)    width = 127;
    if (len == undefined)      len = 50;

    for (let j = 0; j < len; ++j){
        let red = Math.sin(frequency1*j + phase1) * width + center;
        let grn = Math.sin(frequency2*j + phase2) * width + center;
        let blu = Math.sin(frequency3*j + phase3) * width + center;
        //document.write( '<font color="' + RGB2Color(red,grn,blu) + '">&#9608;</font>');
        colorArray[j]=`(${red},${grn},${blu})`;
    }
    return colorArray;
}
