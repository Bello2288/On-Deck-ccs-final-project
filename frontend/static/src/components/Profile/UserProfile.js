import "../../styles/Profile.css";
import { useState, useEffect } from "react";
import ProfileEdit from "./ProfileEdit";

function UserProfile({ superState }) {
  const [userProfile, setUserProfile] = useState();

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    const getUserProfile = async (id) => {
      const response = await fetch(`/api/v1/profiles/${id}/`).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }     
      const data = await response.json();
      setUserProfile(data);
    };
    
    getUserProfile(superState.userProfileId);
  }, [superState]);

  return (
    <section>{userProfile && <ProfileEdit userProfile={userProfile} />}</section>
  );
}

export default UserProfile;
