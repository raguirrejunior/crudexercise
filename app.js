const express = require('express');
// Require Express Handlebars
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
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

// Connection Pool
const pool = mysql2.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to DB
pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    console.log('Connected as ID' + connection.threadId);
});

// Router - transferred to cust router
// app.get('', (req, res) => {
//     res.render('home')
// });

// Link to Router
const routes = require('./server/routes/cust');
app.use('/', routes);




app.listen(port, () => console.log(`Listening on port ${port}`));

