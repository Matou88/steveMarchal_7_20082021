import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Swal from "sweetalert2";
import Navigation from "../Navigation";

const Post = () => {
  const [post, setPost] = useState();
  const [modification, setModification] = useState({ content: "" });
  const [selectImage, setSelectImage] = useState(false);
  const [formDataEmpty, setFormDataEmpty] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setModification({ ...modification, [name]: value });
    setFormDataEmpty(true);
  };

  const changeSelectImage = () => {
    setSelectImage(!selectImage);
    setFormDataEmpty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imagedata = document.querySelector('input[type="file"]').files[0];
    if (selectImage) {
      formData.append("image", imagedata);
    }

    formData.append("content", modification.content);
    console.log(formData);
    if (formDataEmpty === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Veuillez choisir une image ou saisir un texte!",
        confirmButtonColor: "#3085d6",
      });
    } else {
      const token = localStorage.getItem("token");
      axios
        .post("http://localhost:3000/api/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          window.location = "/";
        })
        .catch((err) => {
          console.log(err);
          window.alert(
            "Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l'administrateur du site"
          );
        });
    }
  };

  return (
    <div className="post">
      <Navigation />
      <div >
        <div className="row d-flex justify-content-center">
          <div className="col-10 col-lg-8 mt-5 mx-5 mb-3 rounded bg-profile text-center text-white">
            <h2 className="mt-4 text">Créez votre post</h2>
            <form>
              <Form.Group
                controlId="exampleForm.ControlTextarea1"
                className=" formDimension"
              >
                <Form.Label className="text">Texte à publier</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="content"
                  value={post}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="text-center text mt-4">
                <label className="text mb-3 me-4" htmlFor="image">
                  Image à publier
                </label>
                <input
                  name="image"
                  id="image"
                  className="input-file text"
                  type="file"
                  accept="image/*"
                  onChange={changeSelectImage}
                ></input>
              </div>
              <div className="form-submit">
                <button
                  className="btn btn-danger btn-block mx-5"
                  onClick={handleSubmit}
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;