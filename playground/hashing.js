const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var password = 'abc123!';

// bcrypt.genSalt(10 , (err,salt) =>{
//     bcrypt.hash(password, salt, (err,hash) => {
//         console.log(hash);
//     });
// });
var hashedpwd = '$2a$10$r7qpGlKf/kw04TSHJUTxR.Ewj2JsfSH5kBa0jSZKZrvq4wiCzOurC';
bcrypt.compare(password, hashedpwd, (err,res) => {
    console.log(res);
})

// var data = {
//     id : 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token,'123abc');

// console.log('decoded', decoded);

// var message = 'I am number 4';
// var hash = SHA256(message).toString();

// // Salting Technique
// var data = {
//     id :4
// };
// var token = {
//     data,
//     new_hash : SHA256(JSON.stringify(data) + '123').toString()
// };

// //console.log('data along with token :- ',token);
// token.data.id = 5;
// token.new_hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(data) + '123').toString();

// if(resultHash == token.new_hash){
//     console.log("Token was verified");
// }else{
//     console.log('Token was not verified');
// }
