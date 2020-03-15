import React from 'react';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import Profile from './components/Profile'

import { userActions } from '../../actions';

class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
          response: false,
          user: false,
          list: [],
          //https://github.com/wcamarao/session.socket.io/issues/9#issuecomment-13044749 never use ip to connect socketIOClient when you use localhost
          socket: socketIOClient("http://localhost:4001")
        };
        this.retriveCorrentUser = this.retriveCorrentUser.bind(this);
        this.addFriend = this.addFriend.bind(this);
      }

    componentDidMount() {
        const { socket } = this.state;

        socket.on('chat message', (msg) => {
            this.setState({list: [...this.state.list, msg]})
        });
        socket.on('current-user', (user) => {
            console.log(user);
            this.setState({user: user});
        });
        socket.on('error-msg', (errMsg) => {
            console.log(errMsg);
        });
        this.retriveCorrentUser();
    }

    retriveCorrentUser() {
        const { socket } = this.state;
        socket.emit('current-user');
    }

    addFriend( id ) {
        const { socket } = this.state;

        console.log("FRIEND ID: " + id);
        socket.emit('friend-request', id);
    }

    render() {
        const { list, socket, user } = this.state;
        let input;

        return (
            <div style={{width: '100%'}}>
                <div className="row">
                    <div className="col">
                        <Profile user={user} addFriend={this.addFriend}/>
                    </div>
                    <div className="col-6">
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

                        <div>
                            {list.map((msg, index) => <p key={index}>{msg}</p>)}    
                        </div>
                    </div>
                    <div className="col">
                        <ul className="list-group">
                            <li className="list-group-item active">
                                <img className="rounded-circle" style={{marginRight: '5px'}} src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="40" height="40"/>
                                <span style={{marginRight: '5px'}}>ras justo odio</span>
                                <span className="badge badge-secondary">in-active</span>
                            </li>
                            <li className="list-group-item">Dapibus ac facilisis in </li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
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