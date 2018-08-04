var mongoose = require('mongoose');
const connectionUrl = 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(connectionUrl,{ useNewUrlParser: true });

module.exports = {
    mongoose
}