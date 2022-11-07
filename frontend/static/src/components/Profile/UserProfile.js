import "../../styles/Profile.css";
import { useState, useEffect } from "react";
// import Button from "react-bootstrap/esm/Button";
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

    getUserProfile(superState.userID);
  }, [superState]);

  return (
    <section className="editprofile-view">{userProfile && <ProfileEdit userProfile={userProfile} />}</section>
  );
}

export default UserProfile;







// function UserProfile({ superState }) {
//   return (
//     // <div className="profile-view">This is the profile page</div>
//       <li>
//         <div className="post-info"> 
//             <h2>{post.title}</h2>
//             <p>{post.location}</p>
//             <p>{post.date}</p>
//             <p>{post.time}</p>
//             <span>By {post.author_name} : </span>
//             {/* <Button className="view-link" to={/user/profile/edit}>
//               Edit Profile
//             </Button> */}
//         </div>
//       </li> 
//     );
// }

// export default UserProfile;