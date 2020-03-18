import React, { useState } from "react";
import Snipper from './Snipper';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Profile = (props) => {
    let { user, profileSave } = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    let input;

    let cmp = user ? (<div className="profile-container">
        <img src={user.avatar} alt={'avatar.png'} width={150} height={150} className="rounded-circle" style={{cursor: 'pointer'}} onClick={e => handleShow()}/>
        <h2 className="profile-nick-name">{user.nickName}</h2>
        <p><Link to="/login" className="login100-form-btn profile-logout">Logout</Link></p>
        <Modal show={show} onHide={handleClose}>
            <Modal.Body style={{padding: 0, height: 38}}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Profile Url:</span>
                    </div>
                    <input ref={node => (input = node)} placeholder="write your profile url" type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </div>
            </Modal.Body>
            <Modal.Footer style={{padding: 0}}>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    profileSave(input.value)
                    handleClose();
                    input.value = ''
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

    </div>) : (<Snipper/>)
    return (cmp);
}

export default Profile;