import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ValidError from "./ValidError";

function PostModal({
  showModal,
  handleClose,
  currentPost,
  handleChange,
  handleUpdatePost,
}) {
  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPost.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={currentPost.title}
              onChange={(e) => {
                handleChange({ ...currentPost, title: e.target.value });
              }}
            />
            {currentPost.title.length < 10  && (
              <ValidError message="Title should be at least 10 characters" />
            )}
          </div>
          <div className="form-group mb-3">
            <label>Body</label>
            <textarea
              rows="4"
              className="form-control"
              value={currentPost.body}
              onChange={(e) => {
                handleChange({ ...currentPost, body: e.target.value });
              }}
            />
            {currentPost.body.length < 150 && (
              <ValidError message="Body should be at least 150 characters" />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ minWidth: "130px" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{ minWidth: "130px" }}
            onClick={handleUpdatePost}
            disabled={
              !(currentPost.title.length > 10 && currentPost.body.length > 150)
            }
          >
            <FontAwesomeIcon icon={faEdit} /> Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostModal;
