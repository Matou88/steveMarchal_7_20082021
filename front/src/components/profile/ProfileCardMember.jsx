import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png"

export default function ProfileCardMember(props) {
  const userId = props.user.id;
  const avatarImage = props.user.image
  
  return (
    <>
      <Link
        className="link"
        to={{
          pathname: "/profileSelected/",
          state: { userId },
        }}
      >
        <div className="col">
          <div className="d-flex justify-content-center members">
            <div className="card cardMember mt-2 mx-0 border-0 ">
              <div className="d-flex justify-content-center">
                {avatarImage === null ? (
                  <img
                    src={avatar}
                    className="img-fluid imageMember"
                    alt="avatar"
                  />
                ) : (
                  <img
                    src={props.user.image}
                    className="img-fluid imageMember"
                    alt="avatar"
                  />
                )}
              </div>
              <div className="card-body d-flex justify-content-center p-0 mt-2 text-secondary">
                <p className="card-title ">{props.user.username}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
