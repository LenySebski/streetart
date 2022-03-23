import React, { useRef, useState, useEffect } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = () => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  return (
    <div className={styles.container}>
      <h3>Comment Form </h3>
      <div>
        <textarea
          name="comment"
          id=""
          cols="40"
          rows="6"
          ref={commentEl}
          placeholder="Comment"
        />
      </div>
      <div>
        <input type="text" ref={nameEl} placeholder="name" name="name" />
      </div>
    </div>
  );
};

export default CommentForm;
