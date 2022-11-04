import "../../styles/Post-styles/CreatePost.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Cookies from "js-cookie";


function CreatePost() {
    
    const [state, setState] = useState({
      // image: null,
      category: "",
      teamname: "",
      organization: "",
      location: "",
      date: "",
      time: "",
      notes: "",
    });
  
    const handleError = (err) => {
      console.warn(err);
    };
  
    const handleInput = (e) => {
      const { name, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    // const handleImage = (e) => {
    //   const file = e.target.files[0];
    //   setState({
    //     ...state,
    //     image: file,
    //   });
    // };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
  
      // formData.append("image", state.image);
      formData.append("title", state.title);
      formData.append("category", state.category);
      formData.append("teamname", state.teamname);
      formData.append("organization", state.organization);
      formData.append("location", state.location);
      formData.append("date", state.date);
      formData.append("time", state.time);
      formData.append("notes", state.notes);
      formData.append("status", e.target.value);
  
      const options = {
        method: "POST",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: formData,
      };
  
      const response = await fetch("/api/v1/posts/", options).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      } else {
        const data = await response.json();
        console.log(data);
        setState({
          // image: null,
          category: "",
          teamname: "",
          organization: "",
          location: "",
          date: "",
          time: "",
          notes: "",
        });
      }
    };
  
    return (
      <div className="main-create-area">
        <Form className="create-form">
          <h1 className="form-title">Create New Post</h1>
          <section className="create-flex">
            <div className="create-groups">
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Post Title"
                  name="title"
                  value={state.title}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Select Sport</Form.Label>
                <Form.Select className="form-control" name="category" value={state.category} onChange={handleInput}>
                  <option value="FB">Flag Football</option>
                  <option value="HK">Hockey</option>
                  <option value="SB">Softball</option>
                  <option value="BK">Basketball</option>
                </Form.Select>
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="image">
                <Form.Label>Post Image</Form.Label>
                <Form.Control
                  type="file"
                  className="form-control-file"
                  name="image"
                  onChange={handleImage}
                />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="teamname">
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Team Name"
                  name="teamname"
                  value={state.teamname}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="organization">
                <Form.Label>Sports Organization</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Sport Organization"
                  name="organization"
                  value={state.organization}
                  onChange={handleInput}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location / Field</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location / Field"
                  name="location"
                  value={state.location}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Game Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  name="date"
                  value={state.date}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="time">
                <Form.Label>Game Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Time"
                  name="time"
                  value={state.time}
                  onChange={handleInput}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Additional Notes</Form.Label>
              <textarea
                rows="8"
                className="form-control"
                placeholder="Notes..."
                name="notes"
                value={state.notes}
                onChange={handleInput}
              />
            </Form.Group>
          </section>
          <div className="form-footer">
            <Button
              className="form-button-pairs"
              variant="secondary"
              type="submit"
              value="DRA"
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button
              className="form-button-pairs"
              variant="secondary"
              type="submit"
              value="SUB"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
  
export default CreatePost;