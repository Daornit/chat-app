import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
const FriendAddModal = (props) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { addFriend } = props;

    let input;
    
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Friend
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Friend Add By ID</Modal.Title>
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
                            addFriend(input.value.trim());
                            input.value = '';
                            handleClose();
                        }}>
              Add Friend
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default FriendAddModal;