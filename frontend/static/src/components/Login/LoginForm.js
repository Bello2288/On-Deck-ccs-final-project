import "../../styles/Login.css";
import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useNavigate, Link} from "react-router-dom";

function LoginForm({ superState, setSuperState }) {
    const [state, setState] = useState({
      username: "",
      password: "",
    });
  
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
      const response = await fetch("/dj-rest-auth/login/", options).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      } else {
        const data = await response.json();
        Cookies.set("Authorization", `Token ${data.key}`);
        // navigate("/posts");
        setSuperState({
          ...superState, 
          auth: true, 
          admin: data.is_superuser, 
          userID: data.id, 
          avatar: data.user_avatar,
          username: data.username,
          userProfileId: data.user_profile_id,
          // phonenumber: data.phone_number,
        });
        if (state.is_superuser === true) {
          navigate("/posts/editor")
        } else if (state.is_superuser !== true) {
          console.log(data)
          // console.log(data.user_avatar)
          // console.log(data.user_username)
          navigate("/posts")
        }
      }
    };
    // userStatus

    return (
        <div className="main-display-area">
          <Form className="form" onSubmit={handleSubmit}>
            <h1 className="form-title">Login</h1>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username" 
                name="username"
                value={state.username}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={state.password}
                onChange={handleInput}
              />
            </Form.Group>
            <div className="form-footer">
              <Button className="form-button" variant="dark" type="submit">
                Login
              </Button>
              <div className="create-link">
                <p>
                  Don't have an account? Click <Link className="link login-link" to={"/register"}>here</Link> to create one.
                </p>
              </div>
            </div>
          </Form>
        </div>
      );
    }
    
    export default LoginForm;