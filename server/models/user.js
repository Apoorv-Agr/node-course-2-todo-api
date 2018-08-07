const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        trim : true,
        minlength : 1,
        unique : true,
        validate : {
            validator: function(v) {
                return validator.isEmail(v);
            },
            message : '{VALUE} is not a valid email'
        }
    },
    password : {
        type : String,
        require : true,
        minlength : 6
    },
    tokens :[{
        access : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : true
        }
    }]
});

UserSchema.methods.toJSON = function (){
    var user = this;
    var userObj = user.toObject();
    return _.pick(userObj, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(), access : access}, 'abc123').toString();

    user.tokens.push({access,token})
    // user.tokens = user.tokens.concat([access,token]);
    return user.save().then( ()=>{
        return token;
    });
}

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token,'abc123');
    }catch(e){
        return new Promise((resolve,reject)=>{
            reject();
        });
    }
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    });
};

UserSchema.pre('save', function(next) {
    var user = this;
    if( user.isModified('password')) {
        bcrypt.genSalt(10, (errors,salt) => {
          bcrypt.hash(user.password, salt, (err,hash) =>{
            //   console.log(hash);
              user.password = hash;
            //   console.log(user);
                next();
          });  
        });
        
    }else{
        next();
    }
});

var User = mongoose.model('User',UserSchema);


module.exports = {
    User
};