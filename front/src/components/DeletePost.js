import React from "react";
import axios from "axios";

const DeletePost = ({ id }) => {
  const handleDelete = () => {
    axios.delete("http://localhost:3004/articles/" + id);
    window.location.reload();
  };

  return (
    <button
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          handleDelete();
        }
      }}
    >
      Supprimer
    </button>
  );
};

export default DeletePost;