const express = require('express'),
    path = require("path");
    routes = require('./routes/routes');
    pug = require('pug')
    bodyParser = require("body-parser");

const data = require('./views/data');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
// app.get('/search', routes.search);
app.get('/recipes', routes.recipes)
app.get('/recipeSearch', routes.recipesFindOne);
app.get('/create', routes.create )
app.post('/create', urlencodedParser, routes.createRecipe)


// app.use('/search', (req, res, next) => {
//     const filters = req.query;
//     const filteredUsers = data.filter(user => {
//         let isValid = true;
//         for (key in filters) {
//             console.log(key, user[key], filters[key]);
//             isValid = isValid && user[key] == filters[key];
//         }
//         return isValid;
//     });
//     res.send(filteredUsers);
// });

app.listen(3000);




