const allButton = document.querySelector('#search-all-button');
const characterButton = document.querySelector('#search-character-button');
const potionButton = document.querySelector('#search-potion-button');
const spellButton = document.querySelector('#search-spell-button');

const allForm = document.querySelector('#search-all-form');
const characterForm = document.querySelector('#search-character-form');
const potionForm = document.querySelector('#search-potion-form');
const spellForm = document.querySelector('#search-spell-form');

characterForm.style.display = 'none';
potionForm.style.display = 'none';
spellForm.style.display = 'none';

allButton.addEventListener('click', () => {
    characterForm.style.display = 'none';
    potionForm.style.display = 'none';
    spellForm.style.display = 'none';
    allForm.style.display = '';
});

characterButton.addEventListener('click', () => {
    allForm.style.display = 'none';
    potionForm.style.display = 'none';
    spellForm.style.display = 'none';
    characterForm.style.display = '';
});

potionButton.addEventListener('click', () => {
    allForm.style.display = 'none';
    characterForm.style.display = 'none';
    spellForm.style.display = 'none';
    potionForm.style.display = '';
});

spellButton.addEventListener('click', () => {
    allForm.style.display = 'none';
    potionForm.style.display = 'none';
    characterForm.style.display = 'none';
    spellForm.style.display = '';
});
