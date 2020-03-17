import React from "react";
import Snipper from './Snipper';
import { Link } from 'react-router-dom';

const Profile = (props) => {
    let { user } = props;
    let cmp = user ? (<div className="profile-container">
        <img src={user.avatar} alt={'avatar.png'} width={150} height={150} className="rounded-circle"/>
        <h2 className="profile-nick-name">{user.nickName}</h2>
        <p><Link to="/login" className="login100-form-btn profile-logout">Logout</Link></p>
    </div>) : (<Snipper/>)
    return (cmp);
}

export default Profile;