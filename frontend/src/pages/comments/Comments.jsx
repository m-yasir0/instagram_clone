import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Form from './Form';
import Comment from './Comment';
import { getCommentsAction } from '../../reduxState/actions/commentActions';
import EditComment from './EditComment';

const Comments = () => {
  const { id } = useParams();
  var { comments } = useSelector((state) => state.comments);

  let [modal, setModal] = useState({
    show: false,
    comment: '',
    id: null,
  });
  var dispatcher = useDispatch();
  useEffect(() => {
    console.log('parent');
    dispatcher(getCommentsAction(id));
  }, []);

  let handleModal = (show, comment = '', id = null) => {
    setModal({
      show,
      comment,
      id,
    });
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <EditComment modal={modal} modalHandler={handleModal} />
      <div className='container my-5 py-5'>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-12 col-lg-10 col-xl-8'>
            <div className='card'>
              <div className='card-body'>
                {comments &&
                  comments.map((comment) => {
                    return (
                      <Comment
                        key={comment.id}
                        modalHandler={handleModal}
                        comment={comment}
                      />
                    );
                  })}
              </div>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
