const mysql2 = require('mysql2');

// Connection Pool
const pool = mysql2.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Cust View
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID' + connection.threadId);
        // Cust Connection
        connection.query('SELECT * FROM customer', (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from customer table: \n', rows);
        });
    });
};

// Find User by Search
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID' + connection.threadId);


        let searchTerm = req.body.custsearch;

        // Cust Connection
        connection.query('SELECT * FROM customer WHERE cust_firstname LIKE ? OR cust_lastname LIKE ? OR cust_email LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from customer table: \n', rows);
        });
    });
};

exports.form = (req, res) => {
    res.render('addcust')
}

// Add New Customer
exports.create = (req, res) => {
    const { cust_firstname, cust_lastname, cust_address, cust_phone, cust_email } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID' + connection.threadId);


        let searchTerm = req.body.custsearch;

        // Cust Connection
        connection.query('INSERT INTO customer SET cust_firstname = ?, cust_lastname = ?, cust_address = ?, cust_phone = ?, cust_email = ?', [cust_firstname, cust_lastname, cust_address, cust_phone, cust_email], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('addcust', { alert: 'New Customer added successfully!' });
            } else {
                console.log(err);
            }
            console.log('The data from customer table: \n', rows);
        });
    });

};


// Edit Customer
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID' + connection.threadId);
        // Cust Connection

        connection.query('SELECT * FROM customer WHERE cust_id=?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('editcust', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from customer table: \n', rows);
        });
    });
};


// Update Customer
exports.update = (req, res) => {
    const { cust_firstname, cust_lastname, cust_address, cust_phone, cust_email } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID' + connection.threadId);
        // Cust Connection

        connection.query('UPDATE customer SET cust_firstname = ?, cust_lastname = ?, cust_address = ?, cust_phone = ?, cust_email = ? WHERE cust_id =?', [cust_firstname, cust_lastname, cust_address, cust_phone, cust_email, req.params.id],
            (err, rows) => {
                // When done with the connection, release it
                connection.release();
                if (!err) {
                    pool.getConnection((err, connection) => {
                        if (err) throw err; // not connected!
                        console.log('Connected as ID' + connection.threadId);
                        // Cust Connection

                        connection.query('SELECT * FROM customer WHERE cust_id=?', [req.params.id], (err, rows) => {
                            // When done with the connection, release it
                            connection.release();
                            if (!err) {
                                res.render('editcust', { rows, alert: `${cust_firstname} has been updated.` });
                            } else {
                                console.log(err);
                            }
                            console.log('The data from customer table: \n', rows);
                        });
                    });

                } else {
                    console.log(err);
                }
                console.log('The data from customer table: \n', rows);
            });
    });
};


// Delete Customer
exports.delete = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID' + connection.threadId);

        // Cust Connection
        connection.query('DELETE FROM customer WHERE cust_id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.redirect('/');
            } else {
                console.log(err);
            }
            console.log('The data from customer table: \n', rows);
        });
    });
};


// View Customer All
exports.viewall = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID' + connection.threadId);
        // Cust Connection
        connection.query('SELECT * FROM customer WHERE cust_id =?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('viewcust', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from customer table: \n', rows);
        });
    });
};