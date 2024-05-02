import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { updateCommentsAction } from '../../reduxState/actions/commentActions';

const EditComment = ({ modal, modalHandler }) => {
  let [body, setBody] = useState(modal.comment);
  let dispatcher = useDispatch();
  let handleInput = (e) => {
    setBody(e.target.value);
  };

  useEffect(() => {
    setBody(modal.comment);
  }, [modal.comment]);
  let handleUpdate = () => {
    dispatcher(updateCommentsAction(modal.id, body));
    modalHandler(false);
  };
  return (
    <Modal show={modal.show} onHide={''} centered>
      <Modal.Header>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className='form-control'
          name='body'
          id='body'
          cols='30'
          value={body}
          rows='4'
          onChange={handleInput}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => {
            modalHandler(false);
          }}
        >
          Close
        </Button>
        <Button variant='primary' onClick={handleUpdate}>
          Update Comment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditComment;
