import "../../styles/Registration.css";
import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";


function RegistrationForm({ superState, setSuperState}) {
    const [state, setState] = useState({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        password1: "",
        password2: "",
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleError = (err) => {
        console.warn(err);
      };

    const checkSamePass = (e) => {
        if (state.password1 !== state.password2) {
            alert("Please enter matching passwords.");
            return;
        } else {
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
            body: JSON.stringify(state),
        };
        const response = await fetch("/dj-rest-auth/registration/", options).catch(handleError);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        } else {
            const data = await response.json();
            Cookies.set("Authorization", `Token ${data.key}`);
            navigate("/posts");
            setSuperState({ ...superState, auth: true, admin: data.is_superuser, userID: data.id });
        }
    };

    return (
        <div className="main-display-area">
          <Form className="reg-form" onSubmit={checkSamePass}>
            <h1 className="reg-form-title">Create Account</h1>
            <section className="reg-form-flex">
              <div>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    autoComplete="False"
                    required
                    value={state.username}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    required
                    value={state.email}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password1"
                    required
                    value={state.password1}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    required
                    value={state.password2}
                    onChange={handleInput}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group className="mb-3" controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstname"
                    required
                    value={state.firstname}
                    onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastname"
                    required
                    value={state.lastname}
                    onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phonenumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone # - Only used to send notifications"
                    name="phonenumber"
                    required
                    value={state.phonenumber}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="zipcode">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter zip code"
                    name="zipcode"
                    required
                    value={state.zipcode}
                    onChange={handleInput}
                    />
                </Form.Group>
              </div>
            </section>
            <div className="form-footer">
              <Button className="form-button" variant="dark" type="submit">
                Create Account
              </Button>
            </div>
          </Form>
        </div>
      );
    }
    
    export default RegistrationForm;