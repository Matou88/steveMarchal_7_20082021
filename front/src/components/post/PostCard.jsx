import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Moment from "react-moment";

export default function PostCard(props) {
  const postId = props.postId;
  const username = props.postUsername;
  const userId = props.userId;
  const liked = props.liked;

  const [comments, setComments] = useState([]);

  const getAllComments = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/comment/" + postId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert(
          "Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l'administrateur du site"
        );
      });
  };
  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <>
      <div className="card">
        <div className="d-flex justify-content-center">
          {props.image === null ? (
            <div></div>
          ) : (
            <img className=" img-fluid " src={props.image} alt="avatar" />
          )}
        </div>

        <div className="card-body">
          <h5 className="card-title">{props.content}</h5>
          <p className="card-text">
            <span className="date_post text-muted">
              Posté par {username}
              {", "}
              <Moment fromNow>{props.createdAt}</Moment>
            </span>
          </p>
          <div>
            {" "}
            {comments.length}
            <FontAwesomeIcon icon={faComments} className="comment" />
          </div>
          <div>
            {" "}
            {liked}
            <FontAwesomeIcon icon={faHeart} className="comment heartColor" />
          </div>
          <Link
            to={{
              pathname: "/postSelected/",
              state: { postId, username, userId, liked },
            }}
            className="link"
          >
            <div className="d-flex justify-content-center">
              <button className="bouton btn btn-sm mx-5 ">Voir le post</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
