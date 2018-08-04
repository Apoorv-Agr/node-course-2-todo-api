const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Users} = require('./models/user');
const {Todo} = require('./models/todo');


var app = express();

app.use(bodyParser.json());


app.post('/todos', (req,res) => {
    console.log(req.body);
    var newTodo = new Todo({
        text : req.body.text
    });
    newTodo.save().then( (doc) => {

        res.send(doc);
    }).catch( (e) => {
        //console.log("Unable to save the Data",e);
        res.status(400);
        res.send(e);
    });
});


app.listen(3000 , () => {
    console.log("Started on 3000 port");
})






// var newUser = new Users({
//     email : '  ap@gmail.com '
// }).save().then( (docs) => {
//     console.log("Data that i saved : ",docs);
// }).catch( (err)=>{
//     console.log("Unable to save user ", err);
// });



// var newTodo = new Todo({
//     text : 'Dog Time',
//     completed : false,
//     completedAt : Math.floor(Date.now() / 1000)
// });

