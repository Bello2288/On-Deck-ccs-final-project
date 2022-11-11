import "../../styles/Post-styles/EditPost.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import moment from 'moment';

function EditPost({ state, userProfile }) {
  const [profile, setProfile] = useState(userProfile);
  console.log('userProfile', userProfile)
  console.log('state', state)
  
  // const [state, setState] = useState(getUserProfile);
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);

  const { superState } = useOutletContext();
    // console.log('superState', superState)
    // console.log('state', state)

  const [post, setPost] = useState({
    ... state,
  });

  const handleClose = () => {
    setShow(false);
    handleSubmit();
  };

  const handleShow = () => setShow(true);

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
    // if (post.image instanceof File) {
    //   formData.append("image", post.image);
    // }

    formData.append("title", post.title); 
    formData.append("category", post.category);
    formData.append("teamname", post.teamname);
    formData.append("organization", post.organization);
    formData.append("location", post.location);
    formData.append("date", post.date);
    formData.append("time", post.time);
    formData.append("notes", post.notes);
    formData.append("reserved", post.reserved_by);
    formData.append("reserved_username", post.reserved_by_username);
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

  const handleTakeSpot = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("status", e.target.value);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(`/api/v1/posts/${state.id}/reserve/`, options).catch(handleError);
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
        <p>
          {/* `/api/v1/posts/${state.id}/reserve/` */}
          By <Link className="link login-link" to={`/user/profile/${state.author}`}>&nbsp; {state.author_name}</Link>
        </p>
        {/* <p> {state.reversed_by}</p>  */}
      </section>
      <section className="edit-form-content">
        <div className="content-box">
          <h2 className="post-captions">Team Name & Sports Type</h2>
            <p className="highlight-post">{state.teamname} &nbsp;&nbsp;--&nbsp;&nbsp; {state.category}</p>
          <h2 className="post-captions">Sport Organization</h2>
            <p className="highlight-post">{state.organization}</p>
          <h2 className="post-captions">Game Location</h2>
            <address className="highlight-post">{state.location}</address>
          <h2 className="post-captions">Game Date & Time</h2>
            <time className="highlight-date">
              {moment(state.date).format('MMM Do, YYYY')}&nbsp;&nbsp; at &nbsp;&nbsp;{moment(state.time, "HH:mm:ss").format('h:mm a')}</time>
        </div>
        <div className="notes-box">
          <h2 className="post-notes-caption">Notes Section</h2>
            <p className="highlight-post-notes">{state.notes}</p>
        </div>
      </section>
      {state.status === "DRA" && (
        <div>
          <Button
            className="form-button-pairs"
            variant="secondary"
            type="button"
            value="SUB"
            onClick={handleShow}
          >
            Submit
          </Button>
          <Modal className="create-post-modal" show={show} onHide={handleClose}>
            <Modal.Body>Your post has been submitted and waiting approval</Modal.Body>
            <Modal.Footer>
              <Button 
              className="modal-button-close" 
              type="submit" 
              value="SUB" 
              variant="secondary" 
              onClick={handleSubmit}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
      {state.status === "SUB" && superState.userID === state.author && (
        <div>
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
                onClick={(e) => handleTakeSpot(e)}
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

      {state.status === "TKS" && superState.userID === state.author && (
        <div className="takeseat-buttons">
          <div>
            <p>Reversed by :&nbsp;&nbsp;    {state.reserved_by_username}  </p>
          </div>
          <Button
            className="cancel-seat-buttons"
            variant="secondary"
            type="submit"
            value="PST"
            onClick={(e) => handleSubmit(e)}
          > 
            Cancel Game Post
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
      {state.status === "TKS" && superState.userID === state.reserved_by && (
        <div className="takeseat-buttons">
          <div>
            <p>Reversed by :&nbsp;&nbsp;    {state.reserved_by_username}  </p>
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
      <div className="main-edit-author-area">
        <Form className="edit-author-form">
          <h1 className="edit-author-form-title">Edit Saved Post</h1>
          <section className="edit-author-flex">
            <div className="create-groups">
              <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Post Title"
                    name="title"
                    value={post.title}
                    onChange={handleInput}
                  />
              </Form.Group>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Select Sport</Form.Label>
                <Form.Select className="form-control" name="category" value={post.category} onChange={handleInput}>
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
                  value={post.teamname}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="organization">
                <Form.Label>Sports Organization</Form.Label>
                <Form.Select className="form-control" name="organization" value={post.organization} onChange={handleInput}>
                  <option value="">Choose a Sports Organization</option>
                  <option value="ACMY">ACMY of Greenville </option>
                  <option value="ABC">ABC Sports Center</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location / Field</Form.Label>
                <Form.Select className="form-control" placeholder="location" name="location" value={post.location} onChange={handleInput}>
                  <option value="">Choose a location / field</option>
                  <option value="NWP">Northwest Park (FB)</option>
                  <option value="GPK">Gary L. Pittman Park (FB)</option>
                  <option value="PVC">Pavilion Recreation Complex (HO)</option>
                  <option value="GWP">Gower Park (SB)</option>
                  <option value="STF">Stevens Field (SB)</option>
                  <option value="LSP">Lakeside Park (SB)</option>
                  <option value="ABC">ABC Sports Center (BB)</option>
                  <option value="NSP">Northside Park (BB)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Game Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  name="date"
                  value={post.date}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="time">
                <Form.Label>Game Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Time"
                  name="time"
                  value={post.time}
                  onChange={handleInput}
                />
              </Form.Group>
              <div className="form-footer">
                <Button
                  className="form-button-pairs"
                  variant="dark"
                  type="submit"
                  value="SUB"
                  onClick={(e) => handleSubmit(e)}
                >
                Submit Draft
                </Button>
                <Button
                  className="form-button-pairs"
                  variant="dark"
                  type="submit"
                  value="DRA"
                  onClick={(e) => handleSubmit(e)}
                >
                  Save Draft
                </Button>
                <Button
                  className="form-button-pairs"
                  variant="dark"
                  type="submit"
                  value="REJ"
                  onClick={(e) => handleSubmit(e)}
                >
                  Delete Draft
                </Button>
              </div>
            </div>
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Additional Notes</Form.Label>
              <textarea
                rows="8"
                className="form-control"
                placeholder="Notes..."
                name="notes"
                value={post.notes}
                onChange={handleInput}
              />
            </Form.Group>
          </section>
      </Form>
    </div>
  );

  return <div className="post-view">{isEdit ? editHTML : nonEditHTML}</div>;
}

export default EditPost;