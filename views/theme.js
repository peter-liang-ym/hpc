const gryffindorBtn = document.querySelector('#gryffindor-button');
const slytherinBtn = document.querySelector('#slytherin-button');
const hufflepuffBtn = document.querySelector('#hufflepuff-button');
const ravenclawBtn = document.querySelector('#ravenclaw-button');
const flip = document.querySelector('#flip-colors');
const body = document.querySelector('body');
const container = document.querySelector('.container');
const nav = document.querySelector('nav');

const gryffindor = {
    background: '#eeba30',
    container: '#ae0001',
    text: '#f5e32b',
    nav: '#e53935',
    textSwitched: '#e53935',
    navSwitched: '#cca124'
};
const slytherin = {
    background: '#295f3b',
    container: '#a5a5a5',
    text: '#194529',
    nav: '#b1b1b1',
    textSwitched: '#b1b1b1',
    navSwitched: '#2b6b3e'
};
const hufflepuff = {
    background: '#f7d600',
    container: '#858585',
    text: '#e5b337',
    nav: '#959595',
    textSwitched: '#959595',
    navSwitched: '#f9a825'
};
const ravenclaw = {
    background: '#212e58',
    container: '#5a5a5a',
    text: '#0899c1',
    nav: '#696969',
    textSwitched: '#696969',
    navSwitched: '#273089'
};

let bodyBackground = '#eeba30';
let containerBackground = '#ae0001';
let navBackground = '#e53935';
let fontColor = '#f5e32b';

let switched = 0;
let currentColorScheme = gryffindor;

gryffindorBtn.addEventListener('click', () => {
    switched = 0;
    body.style.background = gryffindor.background;
    body.style.color = gryffindor.text;
    container.style.background = gryffindor.container;
    nav.style.background = gryffindor.nav;
    bodyBackground = gryffindor.background;
    containerBackground = gryffindor.container;
    navBackground = gryffindor.nav;
    fontColor = gryffindor.text;
    currentColorScheme = gryffindor;
});

slytherinBtn.addEventListener('click', () => {
    switched = 0;
    body.style.background = slytherin.background;
    body.style.color = slytherin.text;
    container.style.background = slytherin.container;
    nav.style.background = slytherin.nav;
    bodyBackground = slytherin.background;
    containerBackground = slytherin.container;
    navBackground = slytherin.nav;
    fontColor = slytherin.text;
    currentColorScheme = slytherin;
});

hufflepuffBtn.addEventListener('click', () => {
    switched = 0;
    body.style.background = hufflepuff.background;
    body.style.color = hufflepuff.text;
    container.style.background = hufflepuff.container;
    nav.style.background = hufflepuff.nav;
    bodyBackground = hufflepuff.background;
    containerBackground = hufflepuff.container;
    navBackground = hufflepuff.nav;
    fontColor = hufflepuff.text;
    currentColorScheme = hufflepuff;
});

ravenclawBtn.addEventListener('click', () => {
    switched = 0;
    body.style.background = ravenclaw.background;
    body.style.color = ravenclaw.text;
    container.style.background = ravenclaw.container;
    nav.style.background = ravenclaw.nav;
    bodyBackground = ravenclaw.background;
    containerBackground = ravenclaw.container;
    navBackground = ravenclaw.nav;
    fontColor = ravenclaw.text;
    currentColorScheme = ravenclaw;
});

flip.addEventListener('click', () => {
    if (switched % 2 === 0) {
        body.style.color = currentColorScheme.textSwitched;
        nav.style.background = currentColorScheme.navSwitched;
        body.style.background = currentColorScheme.container;
        container.style.background = currentColorScheme.background;
    }
    else {
        body.style.color = currentColorScheme.text;
        nav.style.background = currentColorScheme.nav;
        body.style.background = currentColorScheme.background;
        container.style.background = currentColorScheme.container;
    }
    switched += 1;
});