
//
//INITIALIZE
//
let body = document.querySelector('body');
let changedGrid = false;
let gridLength =16;
let applyFade = document.getElementById("applyFade");
applyFade.checked = true;



//
//COLOR BUTTONS
//
const rainbowColors=makeColorGradient(.3,.3,.3,0,2,4);
const pastelColors=makeColorGradient(.3,.3,.3,0,2,4, 230,50);
const darkColors=makeColorGradient(.3,.3,.3,0,2,4,90,25);
const goldColors=["(177, 143, 80)"];
const myColors={
    "rainbow":rainbowColors,
    "pastel":pastelColors,
    "dark":darkColors,
    "gold":goldColors
};
let currentColor = 0;
let currentScheme = "rainbow";
const colorButtons=document.querySelectorAll('.color-button');
colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentScheme=button.getAttribute('data-color');
    });
});


//
//MAKE GRID
//
let grid = document.querySelector('.grid-container');
makeGrid(grid)
let gridDivs=document.querySelectorAll('.grid-box');

function makeGrid(myGrid){
    //for function 16 times:
    //makes div with data-order="[order]" class="grid-box"
    //insert inside grid
    for (let i=0;i<(gridLength*gridLength);i++){
        //Initialize squares
        let newDiv = document.createElement('div');
        newDiv.style.backgroundColor = 'rgb(235, 232, 228)';
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
        let scheme= myColors[currentScheme]
        event.target.style.backgroundColor = `rgb${scheme[currentColor]}`; 
        currentColor=(currentColor+1)%scheme.length; 
    }
    
}

function deColorize(event){
    if (applyFade.checked==true){
        event.target.setAttribute('data-over','False');
        event.target.classList.add('turnWhite');
    }
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
    gridDivs=document.querySelectorAll('.grid-box');
}


//
//SLIDER
//
let slider = document.querySelector('#gridSize');
const sliderInput = document.querySelector('#sliderInput');
slider.addEventListener('input', changeGrid);


//
//RESET
//
const reset = document.querySelector('#reset');
reset.addEventListener('click', () => {
    changeGrid();
});


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
        colorArray[j]=`(${red},${grn},${blu})`;
    }
    return colorArray;
}
