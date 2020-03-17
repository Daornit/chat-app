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
  
const { getUserById, requestFriend, getAllUserByID, acceptFriend, rejectFriend } = require('./services');

// All online users
let users = {}
io.on('connection', async function(socket){

    if(!socket.request.session.passport){
        return;
    }

    let userId = socket.request.session.passport.user;
    
    users[userId] = socket.id;
    
    console.log("users :: ", users);
    io.emit('online-users', users);

    let currentUser = await Users.findById(userId);
    
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    
    socket.on('private-chat-send', function(data){
        console.log('Sended Data:: ', data);
        if(users[data.id]) {
            io.to(users[data.id]).emit('private-chat-receive', {id: userId, msg: data['msg']})
        }
    });

    socket.on('current-user', function(){
        console.log('current-user');
        getUserById(userId).then(user => {
            socket.emit('current-user', user);
        }).catch( err => {
            socket.emit('error-msg', "Can't find current user");
        });
    })

    socket.on('get-all-friend', function (){
        console.log("get-all-friend called");
        getAllUserByID(userId).then(data => socket.emit('all-users', data))
    })

    socket.on('friend-request', function (friendId){
        if(friendId == userId) { 
            socket.emit('error-msg', "Can't be friend with yourself"); 
            return;
        } else {
            requestFriend(userId, friendId)
            .then(data => {
                if(users[friendId]) {
                    io.to(users[friendId]).emit('notification', `${currentUser.firstName} requested you to be friend`);
                    getAllUserByID(friendId).then(
                        data =>  io.to(users[friendId]).emit('all-users', data)
                    )
                };
                getAllUserByID(userId).then(data => socket.emit('all-users', data))
            })
            .catch(err => socket.emit('error-msg', "Server side error"))
        }
    })

    socket.on('accept-request', function (friendId){
        if(friendId == userId) { 
            socket.emit('error-msg', "Can't be friend with yourself"); 
            return;
        } else {
            console.log('accept-request');
            acceptFriend(userId, friendId)
            .then(data => {
                if(users[friendId]) {
                    io.to(users[friendId]).emit('notification', `${currentUser.firstName} accepted your friend request`);
                    getAllUserByID(friendId).then(
                        data =>  io.to(users[friendId]).emit('all-users', data)
                    )
                };
                getAllUserByID(userId).then(data => socket.emit('all-users', data))
            })
            .catch(err => socket.emit('error-msg', "Server side error"))
        }
    })

    socket.on('reject-request', function (friendId){
        if(friendId == userId) { 
            socket.emit('error-msg', "Can't be friend with yourself"); 
            return;
        } else {
            rejectFriend(userId, friendId)
            .then(data => {
                console.log("call get-all-friend");
                if(users[friendId]) {
                    io.to(users[friendId]).emit('notification', `${currentUser.firstName} rejected your friend request`);
                    getAllUserByID(friendId).then(
                        data =>  io.to(users[friendId]).emit('all-users', data)
                    )
                };
                getAllUserByID(userId).then(data => socket.emit('all-users', data))
            })
            .catch(err => socket.emit('error-msg', "Server side error"))
        }
    })

    socket.on('disconnect', function(){
        delete users[userId];
        io.emit('online-users', users);
        io.emit('disconnected-user', userId);
        console.log("disconnect users :: ", users);
    });

});
  
server.listen(port, () => console.log(`Listening on port ${port}`));