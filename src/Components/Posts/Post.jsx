import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPostComments } from "../../APIs/commentsApi";
import { useDispatch, useSelector } from "react-redux";

export default function Post(props) {
  const location = useLocation();
  const post = location.state;
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchPostComments({ id: post.id })).then((data) => {
      setComments(data.payload);
      setCommentsLoaded(true);
    });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row p-5">
          <div className="card post-item">
            <div className="card-body">
              <h5>
                {post.id} - {post.title}
              </h5>

              <p className="card-text">{post.body}</p>
            </div>
            <div className="card-footer bg-transparent d-flex flex-row-reverse mb-0">
                <div className="container">
                <div className="row justify-content-center text-center  w-100">
                <h3>Comments</h3>
              </div>

              <div className="row">
                {commentsLoaded ?  comments.length > 0 ? comments.map((comment) => (
                  <div className="card post-item" key={comment.id}>
                    <div className="card-body">
                      <h5>
                        {comment.id} - {comment.name}
                      </h5>

                      <p className="card-text">{comment.body}</p>
                    </div>
                  </div>
                )) : <h1>No Comments</h1>: <h3>Loading Comments.....</h3>}

              </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
