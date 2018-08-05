const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then( (result) => {
//     console.log(result);
// }).catch( (e) =>{
//     console.log(e);
// });

Todo.findOneAndRemove({_id : '5b66a85ea1aa379914362c43'}).then( (result) =>{
    console.log(result);
}).catch( (e) => {
    console.log(e);
});

Todo.findByIdAndRemove('5b66a85ea1aa379914362c43').then( (todo) =>{
    console.log(JSON.stringify(todo, undefined ,2));
}).catch( (err) => {
    console.log(err);
});