const mongoose = require('mongoose');
const { config } = require('process');
mongoose.Promise = global.Promise;
const data = require('../views/data');
mongoose.connect('mongodb://localhost/capstone', {
    useUnifiedTopology: true,
    useNewURLParser: true
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

let recipeSchema = mongoose.Schema({
    name: String,
    ingredients: Array,
    steps: Array,
    timer: Array,
    imageURL: String,
});

const Recipe = mongoose.model('recipes', recipeSchema);


exports.recipes = (req, res) => {
    Recipe.find((err, recipe) => {
        if(err) return console.error(err);
        res.render('recipes', {
            "title": "Recipe List",
            "config": config,
            recipe: recipe
        }); 
    })
};

exports.recipesFindOne = (req, res, next) => {
    const filters = req.query;
    const filteredUsers = data.filter(user => {
        let isValid = true;
        for (key in filters) {
            // console.log(key, user[key], filters[key]);
            isValid = isValid && user[key] == filters[key];
        }
        return isValid;
    });
    // res.send(filteredUsers);
    res.render('recipes', {
        "Title" : "Recipes",
        "config" : config,
        recipe : filteredUsers
    })
};

exports.index = (req, res) => {
    res.render('index', {
        "title" : "Home",
        "config" : config
    });
};

exports.about = (req, res) => {
    res.render('about', {
        "title" : "About",
        "config" : config
    });
};

exports.contact = (req, res) => {
    res.render('contactus', {
        "title" : "Contact Us",
        "config" : config
    });
};

exports.search = (req, res) => {
    res.render('search', {
        "title" : "search",
        "config" : config
    });
};

exports.create = (req, res) => {
    res.render('create', {
        "title" : "create",
        "config" : config
    });
};


exports.createRecipe = (res, req) => {
    let recipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        steps: req.body.steps
    });
    recipe.save((err, recipe) => {
        if(err) return console.error(err);
        console.log(req.body.name + ' Added');
    });
    res.redirect('/')
};

// exports.createRecipe = (res, req) => {
//     var myData = new Recipe(req.body);
//     myData.save()
//     .then(item => {
//         res.redirect('/')
//     })
//     .catch(err => {
//         res.redirect('/create')
//     });
// };
