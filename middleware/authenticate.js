const {User} = require('./../server/models/user');
var authenticate = (req,resp,next) =>{
    var token  = req.header('x-auth');
    //console.log('In server.js : ',token);
    User.findByToken(token).then( (user) => {
        if(!user){
            return resp.status(400).send({
                error : 'User not Found'
            });
        }
        req.user = user;
        req.token = token;
        // resp.send(user);
        next();
    }).catch( (e) =>{
        resp.status(401).send({
            error : 'Not Authorized'
        })
    });
};
module.exports = {authenticate};