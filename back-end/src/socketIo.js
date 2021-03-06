const http = require('http');
const socketIo = require("socket.io");
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('passport');

var passportSocketIo = require('passport.socketio');
var cookieParser = require('cookie-parser');

// models
require('./models/Users');
require('./models/Friends')
const Users = mongoose.model('Users');
const Friends = mongoose.model('Friends');

// service to work with models
const { app, port, sessionMiddleware, redisStore } = require('./app')

const server = http.createServer(app);
const io = socketIo(server);

io.use(passportSocketIo.authorize({
    key: config.sessionCookieKey,
    secret: config.sessionSecret,
    store: redisStore,
    passport: passport,
    cookieParser: cookieParser,
}));

io.use(function (socket, next) {
    sessionMiddleware(socket.request, {}, next);
});
  
const { getUserById, updateUserAvatar, requestFriend, getAllUserByID, acceptFriend, rejectFriend } = require('./services');

// All online users
let users = {}
io.on('connection', async function(socket){

    let userId = socket.request.user._id;
    
    users[userId] = socket.id;
    let currentUser = socket.request.user;
    
    console.log("userId :: ", userId)
    io.emit('online-users', users);

    socket.on('private-chat-send', function(data){
        if(users[data.id]) {
            io.to(users[data.id]).emit('private-chat-receive', {id: userId, msg: data['msg']})
        }
    });

    socket.on('profile-save', function(url) {
        console.log("url :: ", url)
        updateUserAvatar(userId, url).then(savedUser => {
            console.log(savedUser.avatar);
            socket.emit('current-user', savedUser)
        })
    })

    socket.on('current-user', function(){
        console.log('current-user');
        getUserById(userId).then(user => {
            socket.emit('current-user', user);
        }).catch(err => socket.emit('notification', {
            type: 'error',
            msg: 'Server side error'
        }))
    })

    socket.on('get-all-friend', function (){
        console.log("get-all-friend called");
        getAllUserByID(userId).then(data => {
            socket.emit('all-users', data);
        })
    })
    
    socket.on('friend-request', function (friendId){
        requestFriend(userId, friendId)
        .then(data => {
            if(users[friendId]) {
                io.to(users[friendId]).emit('notification', {
                    type: 'info',
                    msg: `${currentUser.nickName} requested you to be friend`
                });
                getAllUserByID(friendId).then(
                    data =>  io.to(users[friendId]).emit('all-users', data)
                )
            };
            getAllUserByID(userId).then(data => socket.emit('all-users', data))
        })
        .catch(err => socket.emit('notification', {
            type: 'error',
            msg: 'Server side error'
        }))
    })

    socket.on('accept-request', function (friendId){
        acceptFriend(userId, friendId)
        .then(data => {
            if(users[friendId]) {
                io.to(users[friendId]).emit('notification', {
                    type: 'info',
                    msg: `${currentUser.nickName} accepted your friend request`
                });
                getAllUserByID(friendId).then(
                    data =>  io.to(users[friendId]).emit('all-users', data)
                )
            };
            getAllUserByID(userId).then(data => socket.emit('all-users', data))
        })
        .catch(err => socket.emit('notification', {
            type: 'error',
            msg: 'Server side error'
        }))
    })

    socket.on('reject-request', function (friendId){
        rejectFriend(userId, friendId)
        .then(data => {
            console.log("call get-all-friend");
            if(users[friendId]) {
                io.to(users[friendId]).emit('notification', {
                    type: 'info',
                    msg: `${currentUser.nickName} rejected your friend request`}
                );
                getAllUserByID(friendId).then(
                    data =>  io.to(users[friendId]).emit('all-users', data)
                )
            };
            getAllUserByID(userId).then(data => socket.emit('all-users', data))
        })
        .catch(err => socket.emit('notification', {
            type: 'error',
            msg: 'Server side error'
        }))
    })

    socket.on('disconnect', function(){
        delete users[userId];
        io.emit('online-users', users);
        io.emit('disconnected-user', userId);
        console.log("disconnect users :: ", users);
    });

});
  
server.listen(port, () => console.log(`Listening on port ${port}`));