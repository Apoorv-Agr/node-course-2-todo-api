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

    // db.collection('Todos').find({completed:true}).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch((err) => {
    //     console.log("Unable to fecth Records",err);
    // });

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b62075314eb5d2d2d5ad562')
    // }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch((err) => {
    //     console.log("Unable to fecth Records",err);
    // });

    db.collection('Todos').find({
    }).count().then((cnt) => {
        //console.log(JSON.stringify(docs, undefined, 2));
        console.log(cnt);
    }).catch((err) => {
        console.log("Unable to fecth Records",err);
    });

    db.collection('users').find({name:'Radhe Mohan'}).toArray().then( (resp) => {
        console.log("Response from users collection \n", resp);
    }).catch( (err) => {
        console.log("Unable to fetch Data",err);
    });
    client.close();
});