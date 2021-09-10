import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function NavBar() {
  function Logout() {
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir vous déconnecté(e) ?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Me déconnecter",
      denyButtonText: "Annuler",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        return (window.location.href = "/");
      }
    });
  }

  return (
    <div>
      <Navbar sticky="top" bg="dark" variant="dark" className="navbar">
        <Link to="/home">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <Nav className="mr-auto">
          <Link to="/home" className="nav-link">
            Forum
          </Link>
          <Link to={"/profile"} className="nav-link">
            Mon profil
          </Link>
        </Nav>
        <FontAwesomeIcon
          icon={faSignInAlt}
          className="nav-icon"
          onClick={Logout}
        />
      </Navbar>
    </div>
  );
}
