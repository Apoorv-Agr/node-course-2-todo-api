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

    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b62075314eb5d2d2d5ad562')
    // },{
    //    $set :{
    //        completed : false
    //    } 
    // }, {
    //     returnOriginal :false
    // }).then( (resp) => {
    //     console.log(resp);
    // }).catch( (err) => {
    //     console.log("Unable to update data", err);
    // });
    db.collection('users').findOneAndUpdate({
        _id: new ObjectID('5b6219afa1aa37991435d211')
    },{
        $set : {
            name: 'Thor'
        },
        $inc : {
            age : -2
        }        
    },{
        returnOriginal :false
    }).then( (resp) => {
        console.log(resp);
    }).catch( (err) =>{
        console.log("Unable to update Data", err);
    })
    client.close();
});