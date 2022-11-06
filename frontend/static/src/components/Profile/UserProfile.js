import "../../styles/Profile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileEdit from "./ProfileEdit";

function UserProfile() {
  const [userProfile, setUserProfile] = useState();

  const { id } = useParams();

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    const getUserProfile = async (id) => {
      const response = await fetch(`/api/v1/profiles/${id}`).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      
      const data = await response.json();
      setUserProfile(data);
    };

    getUserProfile(id);
  }, []);

  return (
    <section className="profile-view">{userProfile && <ProfileEdit userProfile={userProfile} />}</section>
  );
}

export default UserProfile;
