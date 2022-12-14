import "../../styles/Post-styles/CreatePost.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


function CreatePost() {   
    const [state, setState] = useState({
      // image: null,
      title: "Outfielder wanted",
      category: "Softball",
      teamname: "Skull Busters",
      organization: "ABC Sports Center",
      location: "Gower Park",
      date: "2022-11-25",
      time: "18:30",
      notes: "Please bring your own equipment and water. Prefer an outfielder but can shuffle players.",
    });

    const [show, setShow] = useState(false);
    const [showSave, setShowSave] = useState(false);

    const navigate = useNavigate();
  
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
          title: "",
          category: "",
          teamname: "",
          organization: "",
          location: "",
          date: "",
          time: "",
          notes: "",
        });
        navigate("/posts");
      }
    };

    const handleClose = () => {
      handleSubmit();
      setShow(false);
      setShowSave(false);
      // handleSubmit();
    };

    const handleCancel = () => {
      setShow(false);
      setShowSave(false);
    }

    const handleShow = () => setShow(true);
    const handleShowSave = () => setShowSave(true);

    const handleBack = () => { 
      navigate(-1);
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
                  <option value="">Choose a sport</option>
                  <option value="Flag-football">Flag-Football</option>
                  <option value="Hockey">Hockey</option>
                  <option value="Softball">Softball</option>
                  <option value="Basketball">Basketball</option>
                </Form.Select>
              </Form.Group>
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
                <Form.Select className="form-control" name="organization" value={state.organization} onChange={handleInput}>
                  <option value="">Choose a Sports Organization</option>
                  <option value="ACMY of Greenville">ACMY of Greenville </option>
                  <option value="ABC Sports Center">ABC Sports Center</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="loc-date-time-group">
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location / Field</Form.Label>
                <Form.Select className="form-control" placeholder="location" name="location" value={state.location} onChange={handleInput}>
                  <option value="">Choose a location / field</option>
                  <option value="Northwest Park">Northwest Park (Football)</option>
                  <option value="Gary L. Pittman Park">Gary L. Pittman Park (Football)</option>
                  <option value="Pavilion Recreation Complex">Pavilion Recreation Complex (Hockey)</option>
                  <option value="Gower Park">Gower Park (Softball)</option>
                  <option value="Stevens Field">Stevens Field (Softball)</option>
                  <option value="Lakeside Park">Lakeside Park (Softball)</option>
                  <option value="ABC Sports Center">ABC Sports Center (Basketball)</option>
                  <option value="Northside Park">Northside Park (Basketball)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Game Date</Form.Label>
                <Form.Control
                  required
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
                  required
                  type="time"
                  placeholder="Time"
                  name="time"
                  value={state.time}
                  onChange={handleInput}
                />
              </Form.Group>
              <div className="create-form-footer large-cp-btn-pair">
                <Button
                  className="form-button-pairs"
                  variant="secondary"
                  // type="submit"
                  type="button"
                  value="DRA"
                  // onClick={handleSubmit}
                  onClick={handleShowSave}
                >
                  Save
                </Button>
                <Modal className="create-post-modal" show={showSave} onHide={handleClose}>
                  <Modal.Body className="modal-title">Would you like to save this post?</Modal.Body>
                  <Modal.Footer className="footer-text">
                    <Button 
                    className="modal-button-close" 
                    type="submit" 
                    value="DRA" 
                    variant="secondary" 
                    onClick={handleSubmit}>
                      Confirm
                    </Button> 
                    <Button 
                      className="modal-button-close" 
                      type="button"  
                      variant="secondary" 
                      onClick={handleCancel}>
                        Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>

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
                    <Modal.Body className="modal-title">Would you like to submit post for approval?</Modal.Body>
                    <Modal.Footer className="footer-text">
                      <Button 
                      className="modal-button-close" 
                      type="submit" 
                      value="SUB" 
                      variant="secondary" 
                      onClick={handleSubmit}>
                        Confirm
                      </Button> 
                      <Button 
                      className="modal-button-close" 
                      type="button"  
                      variant="secondary" 
                      onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>

                <Button
                  className="form-button-pairs cancel-btn"
                  variant="secondary"
                  type="button"
                  onClick={handleBack}
                  >
                    Cancel
                </Button>
              </div>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="notes">
                <Form.Label>Additional Notes</Form.Label>
                <textarea
                  rows="9"
                  className="form-control"
                  placeholder="Notes..."
                  name="notes"
                  value={state.notes}
                  onChange={handleInput}
                />
              </Form.Group>
            </div>
          </section>
        </Form>
      </div>
    );
  }
  
export default CreatePost;