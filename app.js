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
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));
app.use('/api', require('./routes/api/api.js'));

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
    let characterFound = [];
    let potionFound = [];
    let spellFound = [];

    if (req.body.group === 'all') {
        characterFound = characters;
        potionFound = potions;
        spellFound = spells;

        const name = req.body.name;
        
        characterFound = characterFound.filter(character => {
            let found = false;
            const characterName = character.Name;
            for (let term of name.split(' ')) {
                if (characterName.toLowerCase().match(term.toLowerCase())) found = true;
            }
            return found;
        });
        potionFound = potionFound.filter(potion => {
            let found = false;
            const potionName = potion.Name;
            for (let term of name.split(' ')) {
                if (potionName.toLowerCase().match(term.toLowerCase())) found = true;
            }
            return found;
        });
        spellFound = spellFound.filter(spell => {
            let found = false;
            const spellName = spell.Name;
            for (let term of name.split(' ')) {
                if (spellName.toLowerCase().match(term.toLowerCase())) found = true;
            }
            return found;
        });
    }
    else if (req.body.group === 'characters') {
        console.log('hi');
        characterFound = characters;

        for (let key of Object.keys(req.body)) {
            if (key === 'group') continue;
            else if (key === 'gender') {
                if (req.body.gender === 'm') characterFound = characterFound.filter(character => character.Gender === 'Male');
                else if (req.body.gender === 'f') characterFound = characterFound.filter(character => character.Gender === 'Female');
                else if (req.body.gender === 'a') continue;
            }
            else if (key === 'house') {
                if (req.body.house === 'g') characterFound = characterFound.filter(character => character.House === 'Gryffindor');
                else if (req.body.house === 's') characterFound = characterFound.filter(character => character.House === 'Slytherin');
                else if (req.body.house === 'h') characterFound = characterFound.filter(character => character.House === 'Hufflepuff');
                else if (req.body.house === 'r') characterFound = characterFound.filter(character => character.House === 'Ravenclaw');
                else if (req.body.house === 'u') characterFound = characterFound.filter(character => character.House === 'Unknown');
                else continue;
            }
            else {
                let keyCopy = key;
                characterFound = characterFound.filter(character => {
                    let found = false;
                    if (key !== 'bloodStatus' && key !== 'hairColor' && key !== 'eyeColor') keyCopy = key.charAt(0).toUpperCase() + key.slice(1);
                    const value = character[keyCopy];
                    for (let term of req.body[key].split(' ')) {
                        if (value.toLowerCase().match(term.toLowerCase())) found = true;
                    }
                    return found;
                });
            }
        }
    }
    else if (req.body.group === 'potions') {
        potionFound = potions;

        for (let key of Object.keys(req.body)) {
            if (key === 'group') continue;
            let keyCopy = key;
            if (key !== 'knownIngredients' && key !== 'difficultyLevel') keyCopy = key.charAt(0).toUpperCase() + key.slice(1);
            potionFound = potionFound.filter(potion => {
                let found = false;
                const value = potion[keyCopy];
                for (let term of req.body[key].split(' ')) {
                    if (value.toLowerCase().match(term.toLowerCase())) found = true;
                }
                return found;
            });
        }
    }
    else {
        spellFound = spells;

        for (let key of Object.keys(req.body)) {
            if (key === 'group') continue;
            else if (key === 'type') {
                if (req.body.type === 'a') continue;
                else spellFound = spellFound.filter(spell => spell.Type.toLowerCase().match(req.body.type));
            }
            else {
                let keyCopy = key.charAt(0).toUpperCase() + key.slice(1);
                spellFound = spellFound.filter(spell => {
                    let found = false;
                    const value = spell[keyCopy];
                    for (let term of req.body[key].split(' ')) {
                        if (value.toLowerCase().match(term.toLowerCase())) found = true;
                    }
                    return found;
                });
            }
        }
    }

    let notFound = false;;
    if (characterFound.length === 0 && potionFound.length === 0 && spellFound.length === 0) notFound = true;

    res.render('search_results', {
        notFound: notFound,
        characterFound,
        potionFound,
        spellFound
     });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));