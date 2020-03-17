import React from "react";
import Snipper from './Snipper';
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

export default Profile;