import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png"

function ProfileCard({ name, image }) {
  return (
    <div className="profile_card ms-2 ">
      <div className="col bg-dark p-3 mb-4">
        <div className="text-center text-white">
          <div className="avatar rounded-circle mx-auto">
            {image === null ? (
              <img className="rounded-circle" src={avatar} alt="avatar" />
            ) : (
              <img className="rounded-circle" src={image} alt="avatar" />
            )}
          </div>
          <h4 className="mt-3">Bienvenue</h4>
          <div className="mb-4">{name}</div>
          <div className="fst-italic text-white">sur le résau social de Groupomania</div>
          <Link className="link_profil text-white" to="/profile">
            <div className="mt-4">
              <i className="bi bi-box-arrow-up-right me-2"></i>Voir mon profil
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ProfileCard;
