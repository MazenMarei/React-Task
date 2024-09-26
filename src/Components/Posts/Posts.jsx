import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "../../APIs/postsApi";
import "./posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faTrashAlt,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import PostModal from "./PostModal";
import { Link } from "react-router-dom";
import ValidError from "./ValidError";

function Posts() {
  const posts = useSelector((state) => state.postsData.posts);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: "",
    body: "",
  });
  const [postLoaded, setPostLoaded] = useState(false);

  const [addPostTitleError, setAddPostTitleError] = useState({
    error: false,
    message: "",
  });

  const [addPostBodyError, setAddPostBodyError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    dispatch(fetchPosts()).finally(() => {
      setPostLoaded(true);
    });
  }, []);

  const handleAddPost = () => {

    if (newPost.title.length > 10 && newPost.body.length > 150) {
      setAddPostTitleError({ error: false, message: "" });
      setAddPostBodyError({ error: false, message: "" });

      dispatch(addPost(newPost)).then(() => {
        setNewPost({ title: "", body: "" });
        toast.success("Post added successfully");
      });
    }
  };

  const showEditModal = (post) => {
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleUpdatePost = () => {
    const updatedData = { title: currentPost.title, body: currentPost.body };

    dispatch(updatePost({ id: currentPost.id, updatedData })).finally(() => {
      setShowModal(false);
      toast.success("Post Updated successfully");
    });
  };

  const handleDeletePost = (post) => {
    dispatch(deletePost({ id: post.id })).finally(() => {
      toast.success("Post Deleted successfully");
    });
  };

  return (
    <>
      <div className="posts-container">
        <div className="container">
          {!postLoaded ? (
            <h1>Loading posts.....</h1>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                {posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        {post.id} - {post.title}
                      </h5>

                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            showEditModal(post);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDeletePost(post);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} /> Delete
                        </button>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent d-flex flex-row-reverse mb-0">
                      <Link
                        to={{
                          pathname: `/post/${post.id}`,
                        }}
                        state={post}
                        className="text-decoration-none"
                      >
                        comments <FontAwesomeIcon icon={faAngleRight} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-lg-4">
                <div className="add-post-form rounded-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Title"
                    value={newPost.title}
                    onChange={(e) => {
                      setNewPost({ ...newPost, title: e.target.value });
                    }}
                  />
                  {(newPost.title.length < 10 && newPost.title.length > 0) && (
                    <ValidError message="Title should be at least 150 characters" />
                  )}
                  <textarea
                    className="form-control mb-2"
                    placeholder="Body"
                    rows="4"
                    value={newPost.body}
                    onChange={(e) => {
                      setNewPost({ ...newPost, body: e.target.value });
                    }}
                  />
                  {(newPost.body.length < 150 && newPost.body.length > 0) && (
                    <ValidError message="Body should be at least 150 characters" />
                  )}
                  {

                    <button className="btn btn-success" onClick={handleAddPost} 
                    disabled={!(newPost.title.length > 10 && newPost.body.length > 150)}>
                      <FontAwesomeIcon icon={faPlus} /> Add Post
                    </button>
                    
                  }
                </div>
              </div>
            </div>
          )}
        </div>

        <PostModal
          showModal={showModal}
          handleClose={handleClose}
          currentPost={currentPost}
          handleChange={setCurrentPost}
          handleUpdatePost={handleUpdatePost}
        />

        <ToastContainer />
      </div>

    </>
  );
}

export default Posts;
