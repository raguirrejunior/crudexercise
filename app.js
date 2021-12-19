const express = require('express');
// Require Express Handlebars
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { response } = require('express');

require('dotenv').config();


const app = express();



const port = process.env.PORT || 5000;

// Partsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// Set Templating Engine
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');


// Router
app.get('', (req, res) => {
    res.render('home')
});




app.listen(port, () => console.log(`Listening on port ${port}`));

