import "../../styles/Post-styles/AdminPostReview.css";
import"../../styles/Post-styles/EditPost.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';  
import Cookies from "js-cookie";
import moment from 'moment';


function AdminPostReview() {
    const [state, setState] = useState(null);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleError = (err) => {
    console.warn(err);
    };

    const handleCancel = () => {
        setShow(false);
        setShowDelete(false);
      }

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
    const getPost = async (id) => {
        const response = await fetch(`/api/v1/posts/${id}`).catch(handleError);
        if (!response.ok) {
        throw new Error("Network response was not ok!");
        }

        const data = await response.json();
        setState(data);
    };

    getPost(id);
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("status", e.target.value);

    const options = {
        method: "PATCH",
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
        navigate("/posts/editor");
    }
    };

    const handleClick = () => {
        navigate('/posts/editor');
      };

      const handleClose = () => {
        handleSubmit();
        setShow(false);
        // handleSubmit();
      };
  
      const handleShow = () => setShow(true);
      const handleShowDelete = () => setShowDelete(true);

    return (
    <article className="detail-view">
        {state && (
        <div className="postlist-review-view">
            <section className="highlight-title"> 
                <h2>{state.title}</h2>
                <p>
                    Creator: <Link className="link login-link" to={`/user/profile/${state.author}`}>&nbsp; {state.author_name}{state.avatar}</Link>
                </p>
                {/* <p> {state.reversed_by}</p> */}
            </section>
            <section className="review-form-content">
                <div className="content-box">
                    <h2 className="post-captions">Team Name & Sports Type</h2>
                        <p className="highlight-post">&nbsp;&nbsp;&nbsp;    {state.teamname} &nbsp;&nbsp;--&nbsp;&nbsp; {state.category}</p>
                    <h2 className="post-captions">Sport Organization</h2>
                        <p className="highlight-post">&nbsp;&nbsp;&nbsp;    {state.organization}</p>
                    <h2 className="post-captions">Game Location</h2>
                        <address className="highlight-post">&nbsp;&nbsp;&nbsp;    {state.location}</address>
                    <h2 className="post-captions">Game Date & Time</h2>
                        <time className="highlight-date">
                        &nbsp;&nbsp;&nbsp;    {moment(state.date).format('MMM Do, YYYY')}&nbsp;&nbsp; at &nbsp;&nbsp;{moment(state.time, "HH:mm:ss").format('h:mm a')}</time>
                </div>
                <div className="notes-box">
                    <h2 className="post-notes-caption">Notes Section</h2>
                    <p className="highlight-post-notes">{state.notes}</p>
                </div>
            </section>
            {/* <img className="highlight-img" src={state.image} alt="news article image" /> */}
            {/* <h2 className="review-post-title">{state.title}</h2>
            <section className="review-layout">
                <div>
                    <p className="review-post">{state.teamname}</p>
                    <p className="review-post">{state.organization}</p>
                    <p className="review-post">{state.location}</p>
                    <p className="user-post-data">{moment(state.date).format('MMM Do, YYYY')} at {moment(state.time, "HH:mm:ss").format('h:mm a')}</p>
                </div>
                <p className="review-post">{state.notes}</p>
            </section> */}
            {state.status === "SUB" && (
            <>
                <Button
                    className="form-button-pairs"
                    variant="secondary"
                    type="button"
                    value="PST"
                    // onClick={(e) => handleSubmit(e)}
                    onClick={handleShow}
                >
                    Approve
                </Button>
                <Modal className="create-post-modal" show={show} onHide={handleClose}>
                    <Modal.Body className="modal-title">Approved post and send for viewing?</Modal.Body>
                    <Modal.Footer className="footer-text">
                        <Button 
                        className="modal-button-close" 
                        type="submit" 
                        value="PST" 
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
                    value="REJ"
                    onClick={handleShowDelete}
                >
                    Decline
                </Button>
                <Modal className="create-post-modal" show={showDelete} onHide={handleClose}>
                    <Modal.Body className="modal-title">Decline post and delete?</Modal.Body>
                    <Modal.Footer className="footer-text">
                        <Button 
                        className="modal-button-close" 
                        type="submit" 
                        value="REJ" 
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
                    onClick={handleClick}
                >
                    Back
                </Button>
            </>
            )}
            {state.status === "PST" && (
            <>
                <Button
                    className="form-button-pairs"
                    variant="secondary"
                    type="submit"
                    value="ARC"
                    onClick={(e) => handleSubmit(e)}
                >
                    Archive
                </Button>
                <Button
                    className="form-button-pairs"
                    variant="secondary"
                    type="button"
                    onClick={handleClick}
                >
                    Back
                </Button>
            </>
            )}
            {state.status === "ARC" && (
            <>
                <Button
                    className="form-button-pairs"
                    variant="secondary"
                    type="button"
                    onClick={handleClick}
                >
                    Back
                </Button>
            </>
            )}
        </div>
        )}
    </article>
    );
}
    
export default AdminPostReview;