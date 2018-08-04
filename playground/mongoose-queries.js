const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userId = '5b63bb43e17df707e61ac482';

if( ObjectID.isValid(userId) ) {
   User.findById(userId).then( (userbyid) => {
       if(!userbyid){
           console.log('User Not found');
       }else{
           console.log("List of User by id : ",userbyid);
       }       
   }).catch( (e)=>{
       console.log(e);
   });
}else{
    console.log('UserId is not Valid')
}

// var id = '5b6336e542985054dcd4604211';


// if(!ObjectID.isValid(id)){
//     console.log('Id not Valid');
// }

// Todo.find({
//     _id : id
// }).then( (todos)=>{
//     console.log(todos);
// }).catch( (e) => {
//     console.log(e);
// });

// Todo.findOne({
//     _id : id
// }).then( (todo)=>{
//     if(!todo){
//         console.log('Data not found');
//     }
//     console.log('find one :',todo);
// }).catch( (e) => {
//     console.log(e);
// });

// Todo.findById(id).then( (todobyId)=>{
//     if(todobyId){
//         console.log('todo by id :',todobyId);
//     }else{
//         console.log('Data not found');
//     }   
// }).catch( (e) => {
//     console.log(e);
// });

