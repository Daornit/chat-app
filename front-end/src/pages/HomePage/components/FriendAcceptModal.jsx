import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
const FriendAcceptModal = (props) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { acceptFriend } = props;

    let input;
    
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Accept Friend
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Friend Accept By ID</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input ref={node => (input = node)} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={e => {
                            e.preventDefault()
                            if (!input.value.trim()) {
                              return
                            }
                            acceptFriend(input.value.trim());
                            input.value = '';
                            handleClose();
                        }}>
              Accept Friend
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default FriendAcceptModal;