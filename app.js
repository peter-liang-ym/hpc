// - credit fonts

const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const logger = require('./middleware/logger');
const moment = require('moment');
const characters = require('./data/characters.json');
const potions = require('./data/potions.json');
const spells = require('./data/spells.json');

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/characters', (req, res) => {
    res.render('characters', { characters });
});

app.get('/character', (req, res) => {
    const id = parseInt(req.query.id);
    const character = characters.find(c => c.Id === id);

    if (!character) {
        res.render('error', {
            error: `No character found with ID of ${id}.`
        });
    }
    else {
        res.render('character', { character });
    }
});

app.get('/potion', (req, res) => {
    const id = parseInt(req.query.id);
    const potion = potions.find(c => c.Id === id);
    if (!potion) {
        res.render('error', {
            error: `No potion found with ID of ${id}.`
        })
    }
    else {
        res.render('potion', { potion });
    }
});

app.get('/spell', (req, res) => {
    const id = parseInt(req.query.id);
    const spell = spells.find(c => c.Id === id);
    if (!spell) {
        res.render('error', {
            error: `No spell found with ID of ${id}.`
        })
    }
    else {
        res.render('spell', { spell });
    }
});

app.get('/potions', (req, res) => {
    res.render('potions', { potions });
});

app.get('/spells', (req, res) => {
    res.render('spells', { spells });
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.post('/search', (req, res) => {
    const search_term = req.body.search;
    const terms = search_term.toLowerCase().trim().replace(/  /g, ' ').split(' ');

    const characterFound = characters.filter(character => {
        let found = false;
        const values = Object.values(character).slice(1);
        for (let term of terms) {
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
        const values = Object.values(potion).slice(1);
        for (let term of terms) {
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
        const values = Object.values(spell).slice(1);
        for (let term of terms) {
            values.forEach(value => {
                let toMatch = value;
                if (!isNaN(toMatch)) toMatch = toMatch.toString();
                if (toMatch.toLowerCase().match(term)) found = true;
            });
        }
        return found;
    });
    let notFound = false;;
    if (characterFound.length === 0 && potionFound.length === 0 && spellFound.length === 0) notFound = true;

    res.render('search_results', {
        notFound: notFound,
        search_term,
        characterFound,
        potionFound,
        spellFound
     });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));