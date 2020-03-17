import React from 'react';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import Profile from './components/Profile';
import Friend from './components/Friends';
import { alertActions, chatActions } from "../../actions";
import './style.css';
class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
          response: false,
          user: [],
          onlineUsers: {},
          list: [],
          friends: [],
          chatId: false,
          //https://github.com/wcamarao/session.socket.io/issues/9#issuecomment-13044749 never use ip to connect socketIOClient when you use localhost
          socket: socketIOClient("http://localhost:4001"),
        };

        this.mesRef = React.createRef();
        this.retriveCorrentUser = this.retriveCorrentUser.bind(this);
        this.requestFriend = this.requestFriend.bind(this);
        this.acceptFriend = this.acceptFriend.bind(this);
        this.rejectFriend = this.rejectFriend.bind(this);
        this.setCurrentChatting = this.setCurrentChatting.bind(this)
      }

    componentDidMount() {
        const { socket } = this.state;
        const { dispatch } = this.props;
        socket.on('chat message', (msg) => {
            this.setState({list: [...this.state.list, msg]})
            this.scrollToBottom();
        });

        socket.on('online-users', (onlineUsers) => {
            console.log("onlineUsers :: ", onlineUsers)
            this.setState({onlineUsers})
        });

        socket.on('disconnected-user', (userId) => {
            console.log("disconnected-userId :: ", userId)
            if(userId === this.state.chatId) this.setState({chatId: false})
            dispatch(chatActions.deleteChat(userId))
        });

        socket.on('current-user', (user) => {
            console.log(user);
            this.setState({user: user});
        });

        socket.on('error-msg', (errMsg) => {
            console.log(errMsg);
        });

        socket.on('all-users', (friends) => {
            console.log("friends :: ", friends);
            this.setState({friends});
        });

        socket.on('notification', (msg) => {
            this.props.dispatch(alertActions.success(msg))
        });

        socket.on('private-chat-receive', (data) => {
            this.setCurrentChatting(data.id);
            dispatch(chatActions.receive(data.id, data.msg))
        });

        this.retriveCorrentUser();
        this.getUsers();
    }

    componentWillUnmount() {
        console.log("componentWillUnmount :: ");
        this.state.socket.disconnect()
    }

    retriveCorrentUser() {
        const { socket } = this.state;
        socket.emit('current-user');
    }

    requestFriend ( id ) {
        const { socket } = this.state;

        console.log("REQUIST FRIEND ID: " + id);
        socket.emit('friend-request', id);
    }

    acceptFriend ( id ) {
        const { socket } = this.state;

        console.log("ACCEPT FRIEND ID: " + id);
        socket.emit('accept-request', id);
    }

    rejectFriend ( id ) {
        const { socket } = this.state;

        console.log("REJECT FRIEND ID: " + id);
        socket.emit('reject-request', id);
    }

    getUsers () {   
        const { socket } = this.state;
        socket.emit('get-all-friend');
    }

    scrollToBottom = () => {
		this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
    };
    
    setCurrentChatting = ( id ) => {
        //socket toi herhen holbogdoh be
        let { dispatch } = this.props;
        this.setState({chatId: id})
        dispatch(chatActions.load(id));
    }

    sendChat = (msg) => {
        let { chatId, socket } = this.state;
        let { dispatch } = this.props;
        dispatch(chatActions.send(chatId, msg))
        socket.emit('private-chat-send', {id: chatId, msg});
        this.scrollToBottom();
    } 

    render() {
        const { list, socket, user, onlineUsers, chatId } = this.state;
        let input;

        const { conversation } = this.props;
        console.log("conversation :: ", conversation)

        let listOfChat = conversation[chatId] ? <div class="chat-box" ref={this.mesRef}>
                                                    {conversation[chatId].map((data, index) => <p key={index} class="chat-item">
                                                        {data.msg}
                                                    </p>)}
                                                </div> : ''
        return (
            <div className="container fill-height">
                <div className="row">
                    <div className="col-md-auto">
                        <Profile user={user}/>
                        <Friend current={chatId} setCurrentChatting={this.setCurrentChatting} users={this.state.friends} onlineUsers={onlineUsers} requestFriend={this.requestFriend} acceptFriend={this.acceptFriend} rejectFriend={this.rejectFriend}  />
                    </div>
                    <div className="col">
                        <div class="container">
                            {listOfChat}
                        </div>

                        <div class="chat-footer">
                            <div class="container">
                                <form
                                onSubmit={e => {
                                    e.preventDefault()
                                    this.sendChat(input.value)
                                    input.value = ''
                                }}
                                >
                                    <input disabled={!this.state.chatId} ref={node => (input = node)} />
                                    <button type="submit">sent</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { user } = state.authentication;
    const conversation = state.chat;
    return { user, conversation };
}

const connectedHomePage = connect(mapState, null)(HomePage);
export { connectedHomePage as HomePage };