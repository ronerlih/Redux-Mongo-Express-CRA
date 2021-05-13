import React, { useRef } from "react";
// import { useStoreContext } from "../../utils/GlobalState";
// import { ADD_POST } from "../../utils/actions";
import { addPost } from '../../features/post/postSlice';
import { loading, notLoading, selectLoading } from '../../features/loading/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';

import API from "../../utils/API";

function CreatePostForm() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const authorRef = useRef();
  const dispatch = useDispatch();
  
  // read from store
  const loadingState = useSelector(selectLoading);
  
  // removed, using useDispatch hook from redux and reading the loading state in the line above 
  // const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loading());
    API.savePost({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      author: authorRef.current.value
    })
      .then(result => {
        dispatch(addPost(result.data));
        dispatch(notLoading());
     })
      .catch(err => console.log(err));

    titleRef.current.value = "";
    bodyRef.current.value = "";
  };

  return (
    <div>
      <div className="jumbotron">
        <img
          className="img-fluid img-thumbnail"
          alt="main-img"
          src="https://images.pexels.com/photos/459688/pexels-photo-459688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        />
      </div>
      <h1>Create a blog post</h1>
      <form className="form-group mt-5 mb-5" onSubmit={handleSubmit}>
        <input className="form-control mb-5" required ref={titleRef} placeholder="Title" />
        <textarea className="form-control mb-5" required ref={bodyRef} placeholder="Body" />
        <input className="form-control mb-5" ref={authorRef} placeholder="Screen name" />
        <button className="btn btn-success mt-3 mb-5" disabled={loadingState} type="submit">
          Save Post
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;
