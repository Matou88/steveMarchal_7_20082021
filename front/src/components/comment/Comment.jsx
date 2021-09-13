import React from "react";
import axios from "axios";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function Comments(props) {
  const localUserId = Number(localStorage.getItem("userId"));
  const isAdmin = localStorage.getItem("is_admin");
  const token = localStorage.getItem("token");
  const userId = props.userId;

  const deleteComment = () => {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Une fois supprimé, vous ne pourrez plus récupérez le commentaire",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: "Annuler",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:3000/api/comment/" + props.id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          window.alert(
            "Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l'administrateur du site"
          );
        });
      }
    });
  };

  return (
    <div>
      <div className="card text-center mt-1 mb-2 ">
        <div className="card-header comment-delete">
          <div>
          Posté par {props.user}
          {", "}
          <Moment fromNow>{props.createdAt}</Moment>
          </div>
          <i
            className={ userId === localUserId
              ? "iconeTime"
              : isAdmin === "true"
              ? "iconeTime"
              : "d-none"
            }
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="fontIconeTime delete-icon"
              onClick={deleteComment}
            />
          </i>
        </div>
        <div className="card-body">
          <p className="card-text">{props.content}</p>
        </div>
      </div>
    </div>
  );
}
