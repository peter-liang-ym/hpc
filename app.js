// - credit fonts

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require('./middleware/logger');
const moment = require('moment');
const { resolveSoa } = require('dns');

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

app.get('/search', (req, res) => {
    res.render('search');
});

app.post('/search', (req, res) => {
    const terms = req.body.search.toLowerCase().trim().replace(/  /g, ' ').split(' ');
    const characters = require('./data/characters.json');
    const potions = require('./data/potions.json');
    const spells = require('./data/spells.json');

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

    const found = [...characterFound,...potionFound,...spellFound];
    res.json(found);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));