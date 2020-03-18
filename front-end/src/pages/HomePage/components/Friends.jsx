import React, {useState} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ButtonGroup, Button } from 'react-bootstrap';

const AddFriend = (props) => {
    let { user, requestFriend } = props
    return (<li className="list-group-item">
        <img className="rounded-circle" style={{marginRight: '5px'}} src={user.avatar} alt="" width="40" height="40"/>
        <span style={{marginRight: '5px'}}>{user.nickName}</span>
        <div>
            <Button size="sm" onClick={e => requestFriend(user._id)}>Add Friend</Button>
        </div>
    </li>)
}

const AcceptFriend = (props) => {
    let { user, acceptFriend, rejectFriend } = props
    return (<li className="list-group-item">
        <img className="rounded-circle" style={{marginRight: '5px'}} src={user.avatar} alt="" width="40" height="40"/>
        <span style={{marginRight: '5px'}}>{user.nickName}</span>
        <div>
            <div class="row">
                <div class="col">
                    <Button size="sm" onClick={e => acceptFriend(user._id)}>Accept</Button>
                </div>
                <div class="col">
                    <Button size="sm" onClick={e => rejectFriend(user._id)}>Reject</Button>
                </div>
            </div>
        </div>
    </li>)
}

const PendingFriend = (props) => {
    let { user } = props
    return (<li className="list-group-item">
        <img className="rounded-circle" style={{marginRight: '5px'}} src={user.avatar} alt="" width="40" height="40"/>
        <span style={{marginRight: '5px'}}>{user.nickName}</span>
    </li>)
}

const OnlineFriend = (props) => {
    let { user, onClick, isActive } = props
    let classNm = "list-group-item " + (isActive ? 'active': '');
    return (<li className={classNm} onClick={e => onClick()}>
        <img className="rounded-circle" style={{marginRight: '5px'}} src={user.avatar} alt="" width="40" height="40"/>
        <span style={{marginRight: '5px'}}>{user.nickName}</span>
        <span className="badge badge-success">online</span>
    </li>)
}

const OfflineFriend = (props) => {
    let { user } = props
    return (<li className="list-group-item disabled">
        <img className="rounded-circle" style={{marginRight: '5px'}} src={user.avatar} alt="" width="40" height="40"/>
        <span style={{marginRight: '5px'}}>{user.nickName}</span>
        <span className="badge badge-secondary">offline</span>
    </li>)
}

const Friend = (props)=> {
    let { current, filter, users, acceptFriend, rejectFriend, requestFriend, onlineUsers, setCurrentChatting } = props;

    const [visibilityFilter, setVisibilityFilter] = useState(filter || 3);

    const handleButton = (id) => {
        setVisibilityFilter(id);
    };

    let list;
    if(users){
        if(visibilityFilter === 0) list = users.filter((user) => user.friendsStatus === 0).map(user => <AddFriend key={user._id} user={user} requestFriend={requestFriend}></AddFriend>)
        if(visibilityFilter === 1) list = users.filter((user) => user.friendsStatus === 1).map(user => <AcceptFriend key={user._id} user={user} acceptFriend={acceptFriend} rejectFriend={rejectFriend}></AcceptFriend>)
        if(visibilityFilter === 2) list = users.filter((user) => user.friendsStatus === 2).map(user => <PendingFriend key={user._id} user={user}></PendingFriend>)
        if(visibilityFilter === 3) {
            let onlineFriends = users.filter((user) => user.friendsStatus === 3 &&  onlineUsers.hasOwnProperty(user._id)).map(user => <OnlineFriend isActive={current === user._id} onClick={e => setCurrentChatting(user._id)} key={user._id} user={user}></OnlineFriend>)
            let offlineFriends = users.filter((user) => user.friendsStatus === 3 &&  !onlineUsers.hasOwnProperty(user._id)).map(user => <OfflineFriend key={user._id} user={user}></OfflineFriend>)
            list = [...onlineFriends, ...offlineFriends]
        }
    }

    return (<div>
        <ButtonGroup size="sm" aria-label="First group">
            <Button onClick={e => handleButton(3)} className={visibilityFilter === 3 ? "btn-primary":"btn-secondary"}>Friends</Button>
            <Button onClick={e => handleButton(2)} className={visibilityFilter === 2 ? "btn-primary":"btn-secondary"}>Pending</Button>
            <Button onClick={e => handleButton(1)} className={visibilityFilter === 1 ? "btn-primary":"btn-secondary"}>Requested</Button>
            <Button onClick={e => handleButton(0)} className={visibilityFilter === 0 ? "btn-primary":"btn-secondary"}>Users</Button>
        </ButtonGroup>
        <Scrollbars style={{ height: 'calc(60vh - 270px)' }}>
            <ul className="list-group">
                {list}
            </ul>
        </Scrollbars>
       
    </div>)
}
 
export default Friend;