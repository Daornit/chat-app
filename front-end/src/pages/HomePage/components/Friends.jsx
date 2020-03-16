import React, {useState} from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
// <span className="badge badge-secondary">in-active</span>
const AddFriend = (props) => {
    let { user, requestFriend } = props
    return (<li className="list-group-item active">
        <img className="rounded-circle" style={{marginRight: '5px'}} src={user.avatar} alt="" width="40" height="40"/>
        <span style={{marginRight: '5px'}}>{user.firstName}</span>
        <div>
            <Button onClick={e => requestFriend(user._id)}>Add Friend</Button>
        </div>
    </li>)
}

const AcceptFriend = (props) => {
    let { user, acceptFriend, rejectFriend } = props
    return (<li className="list-group-item active">
        <img className="rounded-circle" style={{marginRight: '5px'}} src={user.avatar} alt="" width="40" height="40"/>
        <span style={{marginRight: '5px'}}>{user.firstName}</span>
        <div>
            <Button onClick={e => acceptFriend(user._id)}>Accept Friend</Button>
            <Button onClick={e => rejectFriend(user._id)}>Reject Friend</Button>
        </div>
    </li>)
}

const PendingFriend = (props) => {
    let { user } = props
    return (<li className="list-group-item active">
        <img className="rounded-circle" style={{marginRight: '5px'}} src={user.avatar} alt="" width="40" height="40"/>
        <span style={{marginRight: '5px'}}>{user.firstName}</span>
    </li>)
}

const FriendToChat = (props) => {
    let { user } = props
    return (<li className="list-group-item active">
        <img className="rounded-circle" style={{marginRight: '5px'}} src={user.avatar} alt="" width="40" height="40"/>
        <span style={{marginRight: '5px'}}>{user.firstName}</span>
    </li>)
}
const Friend = (props)=> {
    let { filter, users, acceptFriend, rejectFriend, requestFriend } = props;

    const [visibilityFilter, setVisibilityFilter] = useState(filter || 3);

    const handleButton = (id) => {
        setVisibilityFilter(id);
    };

    let list;
    if(visibilityFilter === 0) list = users.filter((user) => user.friendsStatus === 0).map(user => <AddFriend key={user._id} user={user} requestFriend={requestFriend}></AddFriend>)
    if(visibilityFilter === 1) list = users.filter((user) => user.friendsStatus === 1).map(user => <AcceptFriend key={user._id} user={user} acceptFriend={acceptFriend} rejectFriend={acceptFriend}></AcceptFriend>)
    if(visibilityFilter === 2) list = users.filter((user) => user.friendsStatus === 2).map(user => <PendingFriend key={user._id} user={user}></PendingFriend>)
    if(visibilityFilter === 3) list = users.filter((user) => user.friendsStatus === 3).map(user => <FriendToChat key={user._id} user={user}></FriendToChat>)
    return (<div>
        <ButtonGroup size="sm" className="mr-2" aria-label="First group">
            <Button onClick={e => handleButton(3)}>Friends</Button>
            <Button onClick={e => handleButton(2)}>Pending</Button>
            <Button onClick={e => handleButton(1)}>Requested</Button>
            <Button onClick={e => handleButton(0)}>Users</Button>
        </ButtonGroup>
        <ul className="list-group">
            {list}
        </ul>
    </div>)
}
 
export default Friend;