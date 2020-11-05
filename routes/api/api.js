const express = require('express');
const characters = require('../../data/characters.json');
const potions = require('../../data/potions.json');
const spells = require('../../data/spells.json');

const router = express.Router();

router.get('/documentation', (req, res) => {
    res.render('documentation');
})

router.get('/characters', (req, res) => {
    res.json(characters);
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
    res.json(potions);
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
    res.json(spells);
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