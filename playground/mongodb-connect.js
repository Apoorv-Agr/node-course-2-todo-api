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

    // db.collection('Todos').insertOne({
    //     text : "Some text",
    //     completed : false
    // }, (err,result) => {
    //     if(err)
    //         return console.log("Unable to insert todo",err);
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })
    // name, age, location
    // db.collection('users').insertOne({
    //     name : "Ram Narayan",
    //     age : 78,
    //     location : "unknown"
    // }, (err,result) => {
    //     if(err)
    //         return console.log("Unable to insert in users", err);
    //     console.log('Document inserted Success', result.ops[0]._id.getTimestamp()); // insertedCount, ops:, insertedId:
    // })

    // client.close();
});