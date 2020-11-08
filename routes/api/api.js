// add houses

const express = require('express');
const characters = require('../../data/characters.json');
const potions = require('../../data/potions.json');
const spells = require('../../data/spells.json');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('documentation');
})

router.get('/characters', (req, res) => {
    const keys = Object.keys(req.query);
    const characterKeys = Object.keys(characters[0]);

    let charactersFound = characters;
    for (let key of keys) {
        if (!req.query[key]) continue;
        let keyCopy = key;
        if (key !== 'bloodStatus' && key !== 'eyeColor' && key !== 'hairColor') keyCopy = key.charAt(0).toUpperCase() + key.slice(1);
        if (!characterKeys.includes(keyCopy)) res.json({ error: `Invalid parameter: ${key}` });
        charactersFound = charactersFound.filter(character => {
            let found = false;
            const value = character[keyCopy];
            for (let term of req.query[key].split(' ')) {
                if (value.toLowerCase().match(term.toLowerCase())) found = true;
            }
            return found;
        });
    }

    if (charactersFound.length === 0) res.json({ error: "No characters found with provided arguments", arguments: req.query });
    else res.json({ parameters: req.query, charactersFound });
});

router.get('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const character = characters.filter(c => c.Id === id);
    if (character.length === 0) {
        res.status(404).json({ error: `No character found with ID of ${id}` });
    }
    else {
        res.json(character[0]);
    }
});

router.get('/potions', (req, res) => {
    const keys = Object.keys(req.query);
    const potionKeys = Object.keys(potions[0]);

    let potionsFound = potions;
    for (let key of keys) {
        if (!req.query[key]) continue;
        let keyCopy = key;
        if (key !== 'knownIngredients' && key !== 'difficultyLevel') keyCopy = key.charAt(0).toUpperCase() + key.slice(1);
        if (!potionKeys.includes(keyCopy)) res.json({ error: `Invalid parameter: ${key}` });
        potionsFound = potionsFound.filter(potion => {
            let found = false;
            const value = potion[keyCopy];
            for (let term of req.query[key].split(' ')) {
                if (value.toLowerCase().match(term.toLowerCase())) found = true;
            }
            return found;
        });
    }

    if (potionsFound.length === 0) res.json({ error: 'No potions found with provided arguments', arguments: req.query });
    else res.json({ parameters: req.query, potionsFound });
});

router.get('/potions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const potion = potions.filter(c => c.Id === id);
    if (potion.length === 0) {
        res.status(404).json({ error: `No potion found with ID of ${id}` });
    }
    else {
        res.json(potion[0]);
    }
});

router.get('/spells', (req, res) => {
    const keys = Object.keys(req.query);
    const spellKeys = Object.keys(spells[0]);

    let spellsFound = spells;
    for (let key of keys) {
        if (!req.query[key]) continue;
        keyCopy = key.charAt(0).toUpperCase() + key.slice(1);
        if (!spellKeys.includes(keyCopy)) res.json({ error: `Invalid parameter: ${key}` });
        spellsFound = spellsFound.filter(potion => {
            let found = false;
            const value = potion[keyCopy];
            for (let term of req.query[key].split(' ')) {
                if (value.toLowerCase().match(term.toLowerCase())) found = true;
            }
            return found;
        });
    }

    if (spellsFound.length === 0) res.json({ error: 'No spells found with provided arguments', arguments: req.query });
    else res.json({ parameters: req.query, spellsFound });
});

router.get('/spells/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const spell = spells.filter(c => c.Id === id);
    if (spell.length === 0) {
        res.status(404).json({ error: `No spell found with ID of ${id}` });
    }
    else {
        res.json(spell[0]);
    }
});

module.exports = router;