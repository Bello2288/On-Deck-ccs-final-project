import "../../styles/Profile.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../../images/blank_avatar.jpeg";
 

const INITIAL_USER_PROFILE_STATE = {
  avatar: null,
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  zipcode: "",
};

function ProfileCreate(superState, setSuperState) {
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
      <Form className="profile-create-container" onSubmit={handleSubmit}>
        <div className="form-head">
          <h1>Create Profile</h1>
          <div className="image-container">
            <img className="profile-image" src={preview} alt="" />
          </div>
        </div>
        <section className="profile-create-inputs">
            <div>
                <Form.Group className="mb-3" controlId="image">
                <Form.Label>Choose a profile picture</Form.Label>
                <Form.Control required type="file" name="avatar" onChange={handleImage} />
                </Form.Group>
            </div>
            <div>
                <Form.Group className="mb-3" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="first_name"
                    required
                    value={state.first_name}
                    onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="last_name"
                    required
                    value={state.last_name}
                    onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone_number">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                    type="tel"
                    minLength="10"
                    maxLength="10"
                    format="+1 (###) ###-####"
                    placeholder="Enter phone # - Only for notifications"
                    name="phone_number"
                    required
                    value={state.phone_number}
                    onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="zipcode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                    type="number"
                    minLength="5"
                    maxLength="5"
                    placeholder="Enter zip code"
                    name="zipcode"
                    required
                    value={state.zipcode}
                    onChange={handleInput}
                    />
                </Form.Group>
                <div>
                    <Button className="form-button" type="submit" variant="dark">
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
