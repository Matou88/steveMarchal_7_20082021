import React from "react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import Navigation from "../components/Navigation";
import Form from "react-bootstrap/Form";

export default function Post() {
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
          window.location = "/Home";
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
    <div>
      <Navigation />
      <div className="bg-profilepage">
        <div className="row d-flex justify-content-center">
          <div className="col-10 col-lg-8 mt-5 mx-5 mb-3 rounded bg-profile text-center text-white">
            <h5 className="mt-4">Créez votre post</h5>
            <form>
              <Form.Group
                controlId="exampleForm.ControlTextarea1"
                className=" formDimension"
              >
                <Form.Label className="form-label">Texte à publier</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="content"
                  value={post}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="text-center mt-4">
                <label className="label-file text-white mb-3" htmlFor="image">
                  Image à publier
                </label>
                <input
                  name="image"
                  id="image"
                  className="input-file text-white"
                  type="file"
                  accept="image/*"
                  onChange={changeSelectImage}
                ></input>
              </div>
              <div className="form-submit">
                <button
                  className="bouton btn  btn-sm mx-5"
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
