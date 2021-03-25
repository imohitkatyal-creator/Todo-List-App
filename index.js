const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const element = require('./models/element');

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.urlencoded());
app.use(express.static('assets'));

//Handling all get request of the port
app.get('/', function (req, res) {
    element.find({}, function (err, allElements) {
        if (err) {
            console.log("Error in fetching data from Database");
            return;
        } else {
            return res.render('home', {
                title: 'ToDo List',
                all_elements: allElements
            });
        }
    });
});

//Adding element to the Database
app.post('/create-task', function (req, res) {
    console.log('Entered values', req.body);
    element.create(req.body, function (err, newElement) {
        if (err) {
            console.log('Error in creating new task', err);
            return;
        }
        else {
            return res.redirect('back');
        }
    })
});
//Deleting single task
app.get('/delete-task/', function (req, res) {
    let id = req.query.id;
    element.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('Error in deleting task from DB', err);
            return;
        }
        return res.redirect('back');
    });
});
app.get('/delete-all', function(req, res){
    element.deleteMany({}, function(err){
        if (err) {
            console.log('Error in deleting task from DB');
            return res.redirect('back');
        }
        return res.redirect('back');
    });
});
//Starting server at port 8000
app.listen(port, function (err) {
    if (err)
        console.log(`Error in starting server at port: ${port}`);
    else
        console.log(`Server started at: ${port}`);
});