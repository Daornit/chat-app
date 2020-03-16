import React from "react";
import Snipper from './Snipper';
import FriendAddModal from './FriendAddModal';
import FriendAcceptModal from './FriendAcceptModal';
import FriendRejectModal from './FriendRejectModal';
import { Link } from 'react-router-dom';

const Profile = (props) => {
    let { user } = props;
    let cmp = user ? (<div>
        <img src={user.avatar} alt={'avatar.png'}/>
    <p>ID: {user._id}</p>
        <p>email: {user.email}</p>
        <p>first name: {user.firstName}</p> 
        <p>last name: {user.lastName}</p> 
        <p><Link to="/login" className="btn btn-primary">Logout</Link></p>
    </div>) : (<Snipper/>)
    return (cmp);
}

{/* <FriendAddModal addFriend={addFriend}/>
<FriendAcceptModal acceptFriend={acceptFriend}></FriendAcceptModal>
<FriendRejectModal rejectFriend={rejectFriend}></FriendRejectModal> */}

export default Profile;