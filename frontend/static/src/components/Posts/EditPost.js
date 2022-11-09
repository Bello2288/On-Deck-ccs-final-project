import "../../styles/Post-styles/EditPost.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useOutletContext } from "react-router-dom";
import moment from 'moment';

function EditPost({ state }) {
  const [isEdit, setIsEdit] = useState(false);

  const { superState } = useOutletContext();
  console.log('superState', superState)
  console.log('state', state)

  const [post, setPost] = useState({
    // image: state.image,
    title: "",
    category: "",
    teamname: "",
    organization: "",
    location: "",
    date: "",
    time: "",
    notes: "",
    reserved: "",
  });


  const navigate = useNavigate();

  const handleError = (err) => {
    console.warn(err);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleImage = (e) => {
  //   const file = e.target.files[0];
  //   setPost({
  //     ...state,
  //     image: file,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (post.image instanceof File) {
      formData.append("image", post.image);
    }

    formData.append("title", state.title);
    formData.append("category", state.category);
    formData.append("teamname", state.teamname);
    formData.append("organization", state.organization);
    formData.append("location", state.location);
    formData.append("date", state.date);
    formData.append("time", state.time);
    formData.append("notes", state.notes);
    formData.append("reserved", state.reserved_by);
    formData.append("status", e.target.value);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(`/api/v1/posts/${state.id}/`, options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      navigate("/posts/user/*");
    }
  };

  const handleClick = () => { 
    navigate('/posts');
  };

  const handleBack = () => { 
    navigate('/posts/user');
  };

  const nonEditHTML = (
    <div className="edit-form">
      {/* <img className="highlight-img" src={state.image} alt="news article image" /> */}
      <section className="highlight-title">
        <h2>{state.title}</h2>
        <p>By {state.author_name}</p>
        <p> {state.reversed_by}</p>
      </section>
      <section className="edit-form-content">
        <div className="content-box">
          <p className="highlight-post">{state.teamname}</p>
          <p className="highlight-post">{state.organization}</p>
          <address className="highlight-post">{state.location}</address>
          <time className="highlight-date">
            {moment(state.date).format('MMM Do, YYYY')}&nbsp;&nbsp; at &nbsp;&nbsp;{moment(state.time, "HH:mm:ss").format('h:mm a')}</time>
        </div>
        <div className="notes-box">
          <p className="highlight-post-notes">{state.notes}</p>
        </div>
      </section>
      {state.status === "DRA" && (
        <div>
          <Button
            className="form-button-pairs"
            variant="secondary"
            type="submit"
            value="SUB"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
          <Button
            className="form-button-pairs"
            variant="secondary"
            type="button"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </Button>
          <Button
              className="form-button-pairs"
              variant="secondary"
              type="button"
              onClick={handleBack}
            >
              Back
            </Button>
        </div>
      )}


      {state.status === "PST" && superState.userID !== state.author && (  
        <div className="takeseat-buttons">
            <Button
                className="form-button-pairs"
                variant="secondary"
                type="submit"
                value="TKS"
                onClick={(e) => handleSubmit(e)}
              >
                Take Spot
            </Button>
            <Button
              className="form-button-pairs"
              variant="secondary"
              type="button"
              onClick={handleClick}
            >
              Back
            </Button>
        </div>
      )}
      {state.status === "PST" && superState.userID === state.author && (  
        <div className="takeseat-buttons">  
            <Button
              className="form-button-pairs"
              variant="secondary"
              type="button"
              onClick={handleClick}
            >
              Back
            </Button>
        </div>
      )}

      {state.status === "TKS" && (
        <div className="takeseat-buttons">
          <div>
            <p>{state.reserved_by}</p>
          </div>
          <Button
            className="cancel-seat-buttons"
            variant="secondary"
            type="submit"
            value="PST"
            onClick={(e) => handleSubmit(e)}
          > 
            Cancel Taken Spot
          </Button>
          <Button
            className="cancel-seat-buttons"
            variant="secondary"
            type="button"
            onClick={handleBack}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );

  const editHTML = (
      <div className="main-create-area">
        <Form className="create-form">
          <h1 className="form-title">Edit Saved Post</h1>
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
                  <option value="Flag-Football">Flag Football</option>
                  <option value="Hockey">Hockey</option>
                  <option value="Softball">Softball</option>
                  <option value="Basketball">Basketball</option>
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
              className="create-button-pairs"
              variant="dark"
              type="submit"
              value="SUB"
              onClick={(e) => handleSubmit(e)}
            >
            Submit Draft
            </Button>
            <Button
              className="create-button-pairs"
              variant="dark"
              type="submit"
              value="DRA"
              onClick={(e) => handleSubmit(e)}
            >
              Save Draft
            </Button>
            <Button
              className="create-button-pairs"
              variant="dark"
              type="submit"
              value="REJ"
              onClick={(e) => handleSubmit(e)}
            >
              Delete Draft
            </Button>
        </div>
      </Form>
    </div>
  );

  return <div className="post-view">{isEdit ? editHTML : nonEditHTML}</div>;
}

export default EditPost;