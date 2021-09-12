import React from "react";
import { useEffect } from "react";
import PostCard from "../components/PostCard";
import ProfileCard from "../components/profile/ProflieCard";
import ProfileCardMember from "../components/profile/ProfileCardMember";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  const getOneProfile = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    axios.get("http://localhost:3000/api/auth/profile/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.log(err);
      window.alert(
        "Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l'administrateur du site"
      );
    });
  };

  const getAllProfile = () => {
    axios.get("http://localhost:3000/api/auth/profile")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
      window.alert(
        "Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l'administrateur du site"
      );
    });
  };

  const getAllPosts = () => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/api/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setPosts(res.data);
    })
    .catch((err) => {
      console.log(err);
      alert(
        "Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l'administrateur du site"
      );
    });
  };

  useEffect(() => {
    getOneProfile();
    getAllProfile();
    getAllPosts();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="row justify-content-center ms-2 home">
        <div className="col-12 col-lg-3">
          <div>
            <ProfileCard name={user.username} image={user.image} />
          </div>
          <div className="fw-bold mb-2 ms-2 ">MEMBRES</div>
          <div className="row">
            {users.map((user) => (
              <ProfileCardMember user={user} key={user.id} />
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-9">
          <Link to="/post" className="link">
            <div className="d-flex justify-content-center">
              <button className="btn btn-danger btn-block mt-4">Publier un post</button>
            </div>
          </Link>
          <div className="pt-3 pb-3 ms-2 fw-bold">DERNIERS POSTS</div>
          <div className="post-list">
            {posts.map((post) => (
              <div className="border rounded ms-2 mb-4 bg-white" key={post.id}>
                <PostCard
                  content={post.content}
                  image={post.image}
                  createdAt={post.createdAt}
                  postUsername={post.User.username}
                  postId={post.id}
                  userId={post.userId}
                  comments={post.comments}
                  liked={post.likes}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
