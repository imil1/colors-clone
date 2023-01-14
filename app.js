const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    event.preventDefault();
    if(event.code.toLowerCase() === 'space') {
        setRandomColors();
    }
});

document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    if(type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0];

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyClickBoard(event.target.innerHTML)
    }
});


function generateColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = ''
    for(let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color;
}


function setRandomColors (isInitial) {
    const colors = isInitial ? getColorFromHash() : [];
    cols.forEach((col,index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const btn = col.querySelector('button');
        // const color = generateColor();
       

        if(isLocked){
            colors.push(text.innerHTML);
            return;
        }
        const color = isInitial 
        ? colors[index] 
            ? colors[index]
            : chroma.random() 
        : chroma.random();

        if(!isInitial){
            colors.push(color);
        }

        text.innerHTML = color;
        col.style.background = color;
        setTextColor(text,color);
        setTextColor(btn,color);
    })
    updateColorsHash(colors)
}

function setTextColor(text,color){
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRandomColors(true);

function copyClickBoard (text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(col => col.toString().substring(1)).join('-');
}

function getColorFromHash() {
    if(document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map(color => '#'+ color);
    }
    return [];
}