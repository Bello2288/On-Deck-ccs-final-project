import "../../styles/TeamRegistration.css";
import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";


function TeamRegistrationForm({ superState, setSuperState}) {
    const [state, setState] = useState({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        password1: "",
        password2: "",
        teamname: "",
        teamsport: "",
        sportscenter: "",
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
        const response = await fetch("/dj-rest-auth/teamregistration/", options).catch(handleError);
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
        <div>
          <Form onSubmit={checkSamePass}>
            <h1>Create Team Account</h1>
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
                placeholder="Enter phone number - USED FOR NOTIFICATIONS"
                name="phonenumber"
                required
                value={state.phonenumber}
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
              <Form.Control
                type="password"
                placeholder="Enter password again"
                name="password2"
                required
                value={state.password2}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="teamname">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter team name"
                name="teamname"
                autoComplete="False"
                required
                value={state.teamname}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="teamsport">
              <Form.Label>Team Sport</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter team sport"
                name="teamsport"
                autoComplete="False"
                required
                value={state.teamsport}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sportcenter">
              <Form.Label>Sport Center</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sport center"
                name="sportcenter"
                autoComplete="False"
                required
                value={state.sportcenter}
                onChange={handleInput}
              />
            </Form.Group>
            <div>
              <Button variant="primary" type="submit">
                Create Team Account
              </Button>
            </div>
          </Form>
        </div>
      );
    }
    
    export default TeamRegistrationForm;