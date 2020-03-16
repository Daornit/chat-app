import React from 'react';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import Profile from './components/Profile';
import Friend from './components/Friends'
import { Button } from 'react-bootstrap'
import { userActions } from '../../actions';
import './style.css';
class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
          response: false,
          user: false,
          list: [],
          friends: [],
          //https://github.com/wcamarao/session.socket.io/issues/9#issuecomment-13044749 never use ip to connect socketIOClient when you use localhost
          socket: socketIOClient("http://localhost:4001"),
        };

        this.mesRef = React.createRef();
        this.retriveCorrentUser = this.retriveCorrentUser.bind(this);
        this.requestFriend = this.requestFriend.bind(this);
        this.acceptFriend = this.acceptFriend.bind(this);
        this.rejectFriend = this.rejectFriend.bind(this);
      }

    componentDidMount() {
        const { socket } = this.state;

        socket.on('chat message', (msg) => {
            this.setState({list: [...this.state.list, msg]})
            this.scrollToBottom();
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
        this.scrollToBottom();
        this.retriveCorrentUser();
        this.getUsers();
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
    
    render() {
        const { list, socket, user } = this.state;
        let input;

        return (
            <div className="container fill-height">
                <div className="row">
                    <div className="col-md-auto">
                        <Profile user={user}/>
                    </div>
                    <div className="col">
                        <div class="container">
                            <div class="chat-box row" ref={this.mesRef}>
                                {list.map((msg, index) => <div key={index} class="col-md-12 chat-item">
                                    {msg}
                                </div>)}
                            </div>
                        </div>

                        <div class="chat-footer">
                            <div class="container">
                                <form
                                onSubmit={e => {
                                    e.preventDefault()
                                    if (!input.value.trim()) {
                                    return
                                    }
                                    socket.emit('chat message', input.value);
                                    input.value = ''
                                }}
                                >
                                    <input ref={node => (input = node)} />
                                    <button type="submit">sent</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-3 friend-sidebar">
                        <Friend users={this.state.friends} requestFriend={this.requestFriend} acceptFriend={this.acceptFriend} rejectFriend={this.rejectFriend}  />
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { user } = state.authentication;
    return { user };
}

const connectedHomePage = connect(mapState, null)(HomePage);
export { connectedHomePage as HomePage };