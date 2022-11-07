
import "../../styles/Profile.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import moment from 'moment';

function ProfileEdit({ userProfile }) {
    const [state, setState] = useState(userProfile);
    const [isEdit, setIsEdit] = useState(false);
    const [preview, setPreview] = useState(state.avatar);

      
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

        const response = await fetch(`/api/v1/profiles/${state.id}/`, options).catch(
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
    
    const previewHTML = (
        <>
        <div className="profile-view">This is the User Profile ( on ProfileEdit 1 )</div>
        <aside>
            <div className="profile-image-container">
                <img className="profile-image" src={state.avatar} alt="" />
            </div>
            <p>{state.first_name}</p>
            <p>{state.last_name}</p>
            <p>{state.email}</p>
            <p>{state.phone_number}</p>
            <p>{state.zipcode}</p>
        </aside>
        <Button type="button" variant="secondary" onClick={() => setIsEdit(true)}>
            Edit
        </Button>
        </>
    );
    
    const editHTML = (
        <>
        <div className="profile-view">This is the User Profile ( on ProfileEdit 2 )</div>
        <Form onSubmit={handleSubmit}>
            <h1>Edit Profile</h1>
            <div className="image-container">
            <img className="form-image" src={state.avatar} alt="" />
            {/* {state.avatar && <img className="form-image" src={preview} alt="" />} */}
            </div>
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



