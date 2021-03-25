const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo_list');

const db = mongoose.connection;

//Error handling while making a connection to Database
db.on('error', console.error.bind(console, 'Error in connecting to database'));

//Once successfully connected to database
db.once('open', function() {
    console.log('Successfully connected to Database');
});