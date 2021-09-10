/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Navbar from "../navbar/NavBar";
import PostCard from "../post/PostCard";
import { useState, useEffect } from "react";
import axios from "axios";
import avatar from "../../assets/avatar.png"
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProfileSelected({ match, props }) {
  const location = useLocation(props);
  const userId = location.state?.userId;
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const getOneProfile = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/auth/profile/" + userId, {
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

  const deleteProfil = () => {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Une fois supprimé, vous ne pourrez plus récupérez votre profil",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Supprimer",
      denyButtonText: "Annuler",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        axios
          .delete("http://localhost:3000/api/auth/profile/" + userId, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            return (window.location.href = "/home");
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

  useEffect(() => {
    getOneProfile();
  }, []);

  const getAllPostsByUser = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/post/user/" + userId, {
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
    getAllPostsByUser();
  }, []);

  return (
    <>
      <div className="bg-profilepage">
        <Navbar />
        <div className="row d-flex justify-content-center">
          <div className="col-10 col-lg-8 mt-5 mx-5 rounded bg-profile">
            <div className="avatar rounded-circle mx-auto">
              {user.image === null ? (
                <img
                  className="rounded-circle"
                  height="150px"
                  src={avatar}
                  alt="avatar"
                />
              ) : (
                <img
                  className="rounded-circle"
                  height="150px"
                  src={user.image}
                  alt="avatar"
                />
              )}
            </div>
            <div className="pb-4 pe-4 ps-4 text-center">
              <h5 className=" text-white mb-4">Informations</h5>
              <div className="border-bottom text-white mb-2">Username</div>
              <div className="text-white mb-4">{user.username}</div>
              <div className="border-bottom text-white mb-2">Email</div>
              <div className="text-white mb-4">{user.email}</div>
              <div className="border-bottom text-white mb-2">Biographie</div>
              <div className="btn_delete text-white mb-4">
                {user.bio}
                <i
                  className="bi bi-pencil-square ms-2"
                  title="Modifier le poste"
                ></i>
              </div>
              {/* <div className={isAdmin === "true" ? "" : "displayNone"}> */}
                <div className="border-bottom text-white mb-2">Mon compte</div>
                <div className="bouton btn btn-sm mx-5" onClick={deleteProfil}>
                  Supprimer le compte
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="bg-profilepage">
          <div className="row d-flex justify-content-center">
            <div className="col-10 col-lg-8 mt-5 p-0 mx-5 rounded">
              <div className="last-post pt-3 pb-3 ms-2 fw-bold">
                DERNIERS POSTS
              </div>
            </div>
          </div>
        </div>
        <div className="bg-profilepage">
          <div className="row d-flex justify-content-center">
            <div className="col-10 col-lg-8 p-0 mx-5 mb-3 rounded">
              <div className=" post-list">
                {posts.map((post) => (
                  <div
                    className="border rounded ms-2 mb-4 bg-white"
                    key={post.id}
                  >
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
      </div>
    </>
  );
}
