const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const validator = require('validator');
const _ = require('lodash');

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
    //console.log('In user.js : ',token);
    var User = this;
    var decoded = jwt.verify(token,'abc123');
    // try {
    //     decoded = ;
    // }catch(e){

    // }
    // console.log(decoded);
    
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    });
};

var User = mongoose.model('User',UserSchema);


module.exports = {
    User
};