import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
const FriendRejectModal = (props) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { rejectFriend } = props;

    let input;
    
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Reject Friend
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Friend Reject By ID</Modal.Title>
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
                            rejectFriend(input.value.trim());
                            input.value = '';
                            handleClose();
                        }}>
              Reject Friend
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default FriendRejectModal;