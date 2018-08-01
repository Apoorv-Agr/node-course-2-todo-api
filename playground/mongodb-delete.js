// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);
// return false;

const connectionUrl = 'mongodb://localhost:27017/TodoApp';
// Object Destructuring
// var newObj = {name:"Apoorv",age:27};

// var {name,age} = newObj;
// console.log(name);
// console.log(age);
// return false;

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client)=>{
    if(err)
        return console.log("Unable to connect to mongodb error");
    console.log("Connected to Mongodb Server");

    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text:'Stop'}).then( (resp) => {
    //     console.log(resp);
    // }).catch( (err) => {
    //     if(err)
    //         console.log("Unavle to delete data",err);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text:'Stop'}).then( (resp) => {
    //     console.log(resp);
    // }).catch( (err) => {
    //     console.log("Unable to delete data ",err);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false}).then( (resp) =>{
    //     console.log(resp);
    // }).catch( (err) => {
    //     console.log("Unable to delete record", err);
    // });

    // delete Many
    // db.collection('users').deleteMany({name:'Radhe Mohan'}).then( (resp) => {
    //     console.log(resp);
    // }).catch( (err) => {
    //     console.log("Unable to delete data", err);
    // });

    // findOneAndDelete
    db.collection('users').findOneAndDelete({_id:ObjectID('5b6215e9bea3593591805e80')}).then( (resp) => {
        console.log(resp);
    }).catch( (err) => {
        console.log("Unable to delete record", err);
    })

    client.close();
});