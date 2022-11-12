
import "../../styles/Profile.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


function ProfileEdit({ superState, userProfile }) {
    const [state, setState] = useState(userProfile);
    const [isEdit, setIsEdit] = useState(false);
    const [preview, setPreview] = useState(state.avatar);

    console.log('state', state)
    console.log('superState', superState)

      
    const handleInput = (e) => { 
        const { name, value } = e.target;
        setState((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    const navigate = useNavigate();

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
    
        const user = { ...state };
        if (!(user.avatar instanceof File)) {
            delete user.avatar;
        }
    
        for (const key in user) {
            if (user[key]) {
                formData.append(key, user[key]);
            }
        }
     
        const options = {
            method: "PATCH",
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
            body: formData,
        };

        const response = await fetch(`/api/v1/profiles/${state.user}/`, options).catch(
            handleError
        );
        if (!response.ok) {
            throw new Error("Network response was not OK");
        } else {
            const data = await response.json();
            console.log(data);
            setIsEdit(false);
            
        }
    };

    const handleBack = () => { 
        navigate('/posts/user');
      };

    
    const previewHTML = (
        <div className="main-profile-container">
            <section className="profile-view-container">
                <div className="image-container">
                    <img className="profile-image" src={preview} alt="" />
                </div>
                <div className="profile-content">
                    <p>Username:&nbsp;&nbsp;&nbsp;    {state.username}</p>
                    <p>Name:&nbsp;&nbsp;&nbsp;    {state.first_name} {state.last_name}</p>
                    <p>Email:&nbsp;&nbsp;&nbsp;    {state.email}</p>
                    <p>Phone #:&nbsp;&nbsp;&nbsp;    {state.phone_number}</p>
                    <p>Zipcode:&nbsp;&nbsp;&nbsp;    {state.zipcode}</p>
                </div>
            </section>
                <div className="profile-edit-buttons">
                    <Button className="form-button profile-edit-btn" type="button" variant="secondary" onClick={() => setIsEdit(true)}>
                        Edit
                    </Button>
                    <Button className="form-button profile-edit-btn" type="button" variant="secondary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </div>
            {/* {superState.userID === userProfile.user && (
                <div>
                    <Button className="form-button" type="button" variant="secondary" onClick={() => setIsEdit(true)}>
                        Edit
                    </Button>
                    <Button className="form-button" type="button" variant="secondary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </div>
            )} */}
            {/* {superState.userID !== userProfile.user && (
                <div>
                    <Button className="form-button" type="button" variant="secondary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </div>
            )} */}
        </div>
    );
    
    const editHTML = (
        <>
        <Form className="main-edit-container" onSubmit={handleSubmit}>
            <h1>Edit Profile</h1>
            <div className="edit-view-container">
                <div className="image-container">
                    <img className="profile-image" src={state.avatar} alt="" />                    
                </div>
                <div className="edit-profile-content">
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Choose a profile picture</Form.Label>
                        <Form.Control type="file" name="avatar" onChange={handleImage} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="first-name">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            placeholder="First name..."
                            type="text"
                            name="first_name"
                            value={state.first_name}
                            onChange={handleInput}
                        />
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="last-name">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            placeholder="Last name..."
                            type="text"
                            name="last_name"
                            value={state.last_name}
                            onChange={handleInput}
                        />
                    </Form.Group>
                </div>
                <div className="edit-profile-content">
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Preferred email</Form.Label>
                        <Form.Control
                            required
                            placeholder="email@example.com..."
                            type="email"
                            name="email"
                            value={state.email}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone_number">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control   
                            required
                            placeholder="Enter phone # - Only for notifications"
                            type="tel"
                            minLength="10"
                            maxLength="10"
                            name="phone_number"
                            format="+1 (###) ###-####"
                            value={state.phone_number}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="zipcode">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                            required
                            placeholder="Enter zip code"
                            type="number"
                            minLength="5"
                            maxLength="5"
                            name="zipcode"
                            value={state.zipcode}
                            onChange={handleInput}
                        />
                    </Form.Group>
                </div>
            </div>    
            <div>
                <Button className="form-button" type="submit" variant="secondary">
                    Save
                </Button>
            </div>
        </Form>
        </>
    );
    return <div className="edit-profile">{isEdit ? editHTML : previewHTML}</div>;
}

export default ProfileEdit;



