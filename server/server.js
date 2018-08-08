const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {authenticate} = require('./../middleware/authenticate');

const port = process.env.PORT || 3000;


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

app.get('/todos', (req,resp) =>{
    Todo.find().then( (todos) => {
        resp.send({
            todos
        })
    }).catch( (e) => {
        resp.status(400).send(e);
    });
})

// GET /todos/123
app.get('/todos/:id', (req,resp)=>{
    var id = req.params.id;
    //resp.send(id);
    
    if(!ObjectID.isValid(id)){
        resp.status(404).send({
            error : 'Invalid ID'
        });
    }else{
        Todo.findById(id).then ( (dbresp) => {
            if(!dbresp){
                resp.status(400).send({
                    error : 'Data not found'
                })
            }else{
                resp.send({todo :dbresp});
            }
        }).catch( (e) => {
            resp.status(400).send({
                error : 'connection issue'
            });
        });
    }
    
});
// app.delete()
app.delete('/todo/:id', (req,resp) => { 
    var params_id = req.params.id;
    // resp.send({
    //     id : params_id
    // });
    if( !ObjectID.isValid(params_id) ){
        resp.status(404).send({
            error : 'Invalid id'
        });
    }else{
        Todo.findByIdAndRemove(params_id).then( (todo) => {
            if(todo){
                resp.status(200).send({
                    todo
                });
            }else{
                resp.status(404).send({
                    error : 'Id can not be found'
                });
            }
        }).catch( (err)=>{
            
            resp.status(400).send({
                error : 'Something went wrong'
            });
        })
    }
    // 404 for invalid id
    // success :- if no doc 404 else send 200
    // error 40    
});

app.patch('/todos/:id', (req,resp) =>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    if( !ObjectID.isValid(id) ){
        return resp.status(404).send({
            error : 'Invalid id'
        });
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set :body}, {new : true}).then( (todo) => {
        if(!todo)
            return resp.status(404).send({error : 'id not found'});
        return resp.status(200).send({todo});
    }).catch( (e) =>{
        return resp.status(400).send({error:'Unable to update data'});
    });
});

app.post('/user', (req,resp) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);
    // model methods User
    // instance method user
    // User.findByToken
    user.save().then(()=>{
        return user.generateAuthToken();
        // resp.send(saveResp);
    }).then((token) =>{
        resp.header('x-auth', token).send(user);
    }).catch( (e) => {
        resp.status(400).send({
            error : 'Some error in saving user',
            errorDesc : e
        });
    });
});

app.get('/users/me', authenticate , (req,resp) => {
    resp.send(req.user);
});

app.post('/users/login' , (req,resp) => {
    let email = req.body.email;
    let pwd = req.body.password;

    User.findByCredentials(email,pwd).then( (user) =>{
        // resp.send(user);
        return user.generateAuthToken().then( (token) =>{
            resp.header('x-auth', token).send(user);
        });
    }).catch( (err) =>{
        resp.status(400).send(err);
    });
});

app.listen(port, () => {
   console.log(`Started on ${port} port`);
});
// var newUser = new Users({
//     email : 'ap@gmail.com'
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