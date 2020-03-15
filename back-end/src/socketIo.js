const http = require('http');
const socketIo = require("socket.io");
const axios = require("axios");
const mongoose = require('mongoose');

// models
require('./models/Users');
require('./models/Friends')
const Users = mongoose.model('Users');
const Friends = mongoose.model('Friends');

// service to work with models
const { app, port, sessionMiddleware } = require('./app')

const server = http.createServer(app);
const io = socketIo(server);

io.use(function (socket, next) {
    sessionMiddleware(socket.request, {}, next);
});
  
const { getUserById, requestFriend, getAllFriendByID } = require('./services');

io.on('connection', function(socket){
    let userId = socket.request.session.passport.user;
    
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    
    socket.on('current-user', function(){
        console.log('current-user');
        getUserById(userId).then(user => {
            socket.emit('current-user', user);
        }).catch( err => {
            socket.emit('error-msg', "Can't find current user");
        });
    })

    socket.on('friend-request', function (friendId){
        getAllFriendByID(userId).then(data => { console.log("All Friends Of User :: ", data)})
        if(friendId == userId) { 
            socket.emit('error-msg', "Can't be friend with yourself"); 
            return;
        } else {
            // requestFriend(userId, friendId)
            // .then(data => console.log("Successfully requested"))
            // .catch(err => console.log("Failed to execute:: ", err))
        }
    })
});
  
server.listen(port, () => console.log(`Listening on port ${port}`));