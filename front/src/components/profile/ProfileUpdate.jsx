/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

export default function ProfileUpdate(props) {
  const [user, setUser] = useState([]);
  const [modification, setModification] = useState([]);
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setModification({ ...modification, [name]: value });
  };

  const handleSubmitModification = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    axios
      .put("http://localhost:3000/api/auth/profile/" + userId, modification, {
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
  };

  const handleRegisterPassword = async (e) => {
    e.preventDefault();
    if (password !== controlPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Les passwords ne correspondent pas !!",
      });
    } else {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const res = await axios.put(
          "http://localhost:3000/api/auth/profile/" + userId + "/password",
          { password: password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire({
          title: "Changement de password réussie",
          confirmButtonText: `Ok`,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Username ou email déjà utilisé!",
        });
      }
    }
  };

  return (
    <>
      <div className={props.modProfile ? "displayNone" : "bg-profilepage"}>
        <div className="row d-flex justify-content-center">
          <div className="col-10 col-lg-8 mt-5 mx-5 mb-3 rounded bg-profile text-center text-white">
            <h5 className="mt-4">Modifiez votre profil</h5>
            <form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="form-label">
                  Modifiez Username
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea2">
                <Form.Label className="form-label">Modifiez Email</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea3">
                <Form.Label className="form-label">Rédigez une bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="form-submit">
                <button
                  className="bouton btn btn-outline-success btn-sm mx-5 "
                  onClick={props.funcModification}
                >
                  Annuler
                </button>
                <button
                  className="bouton btn btn-outline-success btn-sm mx-5 "
                  onClick={handleSubmitModification}
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={props.modPassword ? "displayNone" : "bg-profilepage"}>
        <div className="row d-flex justify-content-center">
          <div className="col-10 col-lg-8 mt-5 mx-5 mb-3 rounded bg-profile text-center text-white">
            <h5 className="mt-4">Modifiez votre password</h5>
            <form>
              <Form.Group controlId="formBasicPassword1">
                <Form.Label className="form-label">Nouveau password</Form.Label>
                <Form.Control
                  type="password"
                  rows={1}
                  name="password"
                  value={user.bio}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword2">
                <Form.Label className="form-label">
                  Confirmez nouveau password
                </Form.Label>
                <Form.Control
                  type="password"
                  rows={1}
                  name="controlePassword"
                  value={user.bio}
                  onChange={(e) => setControlPassword(e.target.value)}
                />
              </Form.Group>
              <div className="form-submit">
                <button
                  className="bouton btn btn-outline-success btn-sm mx-5 "
                  onClick={props.funcPassword}
                >
                  Annuler
                </button>
                <button
                  className="bouton btn btn-outline-success btn-sm mx-5 "
                  onClick={handleRegisterPassword}
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
