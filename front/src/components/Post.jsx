import React, { useState } from "react";
import axios from "axios";
import DeletePost from "./DeletePost";

const Post = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditContent] = useState("");

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    const data = {
      author: post.author,
      content: editedContent ? editedContent : post.content,
      date: post.date,
    };

    axios.put("http://localhost:3300/api/post" + post.id, data).then(() => {
      setIsEditing(false);
    });
  };

  return (
    <div className="post">
      <div className="card-header">
        <h3>{post.author}</h3>
        <em>Posté le {dateParser(post.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : post.content}
        ></textarea>
      ) : (
        <p>{editedContent ? editedContent : post.content}</p>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeletePost id={post.id} />
      </div>
    </div>
  );
};

export default Post;
