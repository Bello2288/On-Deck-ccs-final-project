import "../../styles/Profile.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../../images/blank_avatar.jpeg";
 

// const INITIAL_USER_PROFILE_STATE = {
//   avatar: defaultProfileImage,
//   first_name: "",
//   last_name: "",
//   email: "",
//   phone_number: "",
//   zipcode: "",
// };

function ProfileCreate(superState, setSuperState) {
  
  const INITIAL_USER_PROFILE_STATE = {
    avatar: defaultProfileImage,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    zipcode: "",
  };


  const [state, setState] = useState(INITIAL_USER_PROFILE_STATE);
  const [preview, setPreview] = useState(defaultProfileImage);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setState({
      ...state,
      avatar: file,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    for (const key in state) {
      if (state[key]) {
        formData.append(key, state[key]);
      }
    }

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api/v1/profiles/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setState(INITIAL_USER_PROFILE_STATE);
      navigate("/posts");
      setSuperState({
        ...superState,
        avatar: data.avatar,
        userID: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
      });
      navigate("/posts"); 
    }
  };

  return (
    <section className="form-display"> 
      <Form className="profile-create-container create-fade" onSubmit={handleSubmit}>
        <div className="form-head">
          <h1 className="form-head-title">Create Profile</h1>
          <div className="image-container">
            <img className="profile-image" src={preview} alt="" />
          </div>
        </div>
        <section className="profile-create-inputs">
            <div>
                <Form.Group className="mb-3 create-profile-form" controlId="image">
                <Form.Label>Choose a profile picture</Form.Label>
                <Form.Control className="placehldr" required type="file" name="avatar" onChange={handleImage} />
                </Form.Group>
            </div>
            <div>
                <Form.Group className="mb-3 create-profile-form" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      className="placehldr"
                      type="text"
                      placeholder="Enter first name"
                      name="first_name"
                      required
                      value={state.first_name}
                      onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3 create-profile-form" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      className="placehldr"
                      type="text"
                      placeholder="Enter last name"
                      name="last_name"
                      required
                      value={state.last_name}
                      onChange={handleInput}
                      />
                </Form.Group>
                <Form.Group className="mb-3 create-profile-form" controlId="phone_number">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                    className="placehldr"
                    type="tel"
                    minLength="10"
                    maxLength="10"
                    format="+1 (###) ###-####"
                    placeholder="Enter phone # - Only for notifications"
                    name="phone_number"
                    value={state.phone_number} 
                    onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3 create-profile-form" controlId="zipcode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      className="placehldr"
                      type="number"
                      minLength="5"
                      maxLength="5"
                      placeholder="Enter zip code"
                      name="zipcode"
                      value={state.zipcode}
                      onChange={handleInput}
                    />
                </Form.Group>
                <div>
                    <Button className="profile-create-save-button" type="submit" variant="secondary">
                        Save
                    </Button>
                </div>
            </div>
        </section>
      </Form>
    </section>
  );
}

export default ProfileCreate;
