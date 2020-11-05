const express = require('express');
const characters = require('../../data/characters.json');
const potions = require('../../data/potions.json');
const spells = require('../../data/spells.json');

const router = express.Router();

router.get('/all/:term', (req, res) => {
    const terms = decodeURIComponent(req.params.term).split(' ');

    const characterFound = characters.filter(character => {
        let found = false;
        const values = Object.values(character).slice(1);
        for (let term of terms) {
            term = term.toLowerCase().trim();
            values.forEach(value => {
                let toMatch = value;
                if (!isNaN(toMatch)) toMatch = toMatch.toString();
                if (toMatch.toLowerCase().match(term)) found = true;
            });
        }
        return found;
    });

    const potionFound = potions.filter(potion => {
        let found = false;
        const values = Object.values(potion).slice(0, -1);
        for (let term of terms) {
            term = term.toLowerCase().trim();
            values.forEach(value => {
                let toMatch = value;
                if (!isNaN(toMatch)) toMatch = toMatch.toString();
                if (toMatch.toLowerCase().match(term)) found = true;
            });
        }
        return found;
    });

    const spellFound = spells.filter(spell => {
        let found = false;
        const values = Object.values(spell).slice(0, -1);
        for (let term of terms) {
            term = term.toLowerCase().trim();
            values.forEach(value => {
                let toMatch = value;
                if (!isNaN(toMatch)) toMatch = toMatch.toString();
                if (toMatch.toLowerCase().match(term)) found = true;
            });
        }
        return found;
    });

    const found = [...characterFound, ...potionFound, ...spellFound];

    if (found.length === 0) res.status(404).json({ error: `No results found for ${term}`});
    else res.json(found);
});

router.get('/characters/:term', (req, res) => {
    const terms = decodeURIComponent(req.params.term).split(' ');

    const characterFound = characters.filter(character => {
        let found = false;
        const values = Object.values(character).slice(1);
        for (let term of terms) {
            term = term.toLowerCase().trim();
            values.forEach(value => {
                let toMatch = value;
                if (!isNaN(toMatch)) toMatch = toMatch.toString();
                if (toMatch.toLowerCase().match(term)) found = true;
            });
        }
        return found;
    });

    if (characterFound.length === 0) res.status(404).json({ error: `No character results found for ${term}` });
    else res.json(characterFound);
});

router.get('/potions/:term', (req, res) => {
    const terms = decodeURIComponent(req.params.term).split(' ');

    const potionFound = potions.filter(potion => {
        let found = false;
        const values = Object.values(potion).slice(0, -1);
        for (let term of terms) {
            term = term.toLowerCase().trim();
            values.forEach(value => {
                let toMatch = value;
                if (!isNaN(toMatch)) toMatch = toMatch.toString();
                if (toMatch.toLowerCase().match(term)) found = true;
            });
        }
        return found;
    });

    if (potionFound.length === 0) res.status(404).json({ error: `No potion results found for ${term}` });
    else res.json(potionFound);
});

router.get('/spells/:term', (req, res) => {
    const terms = decodeURIComponent(req.params.term).split(' ');

    const spellFound = spells.filter(spell => {
        let found = false;
        const values = Object.values(spell).slice(0, -1);
        for (let term of terms) {
            term = term.toLowerCase().trim();
            values.forEach(value => {
                let toMatch = value;
                if (!isNaN(toMatch)) toMatch = toMatch.toString();
                if (toMatch.toLowerCase().match(term)) found = true;
            });
        }
        return found;
    });

    if (spellFound.length === 0) res.status(404).json({ error: `No spell results found for ${terms}` });
    else res.json(spellFound);
});

module.exports = router;