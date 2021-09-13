import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png"

function ProfileCard({ name, image }) {
  return (
    <div className="profile_card ms-lg-2">
      <div className="profile_card bg-dark p-3 mb-4">
        <div className="text-center text-white">
          <div className="avatar rounded-circle">
            {image === null ? (
              <img className="rounded-circle avatar img-profile-selected" src={avatar} alt="avatar" />
            ) : (
              <img className="rounded-circle avatar img-profile-selected" src={image} alt="avatar" />
            )}
          </div>
          <h4 className="mt-3">Bienvenue</h4>
          <div className="mb-4">{name}</div>
          <div className="fst-italic text-white">sur le résau social de Groupomania</div>
          <Link className="link_profil text-white" to="/profile">
            <div className="mt-4">
              <button className="btn btn-danger btn-block">Voir mon profil</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ProfileCard;
