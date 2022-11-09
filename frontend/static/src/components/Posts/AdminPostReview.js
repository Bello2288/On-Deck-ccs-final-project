import "../../styles/Post-styles/AdminPostReview.css";
import"../../styles/Post-styles/EditPost.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import moment from 'moment';


function AdminPostReview() {
    const [state, setState] = useState(null);

    const handleError = (err) => {
    console.warn(err);
    };

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

    return (
    <article className="detail-view">
        {state && (
        <div className="postlist-review-view">
            <section className="highlight-title">
                <h2>{state.title}</h2>
                <p>By {state.author_name}</p>
                <p> {state.reversed_by}</p>
            </section>
            <section className="review-form-content">
                <div className="content-box">
                    <p className="highlight-post">{state.teamname}</p>
                    <p className="highlight-post">{state.organization}</p>
                    <address className="highlight-post">{state.location}</address>
                    <time className="highlight-date">
                        {moment(state.date).format('MMM Do, YYYY')} at {moment(state.time, "HH:mm:ss").format('h:mm a')}</time>
                </div>
                <div className="notes-box">
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
                type="submit"
                value="PST"
                onClick={(e) => handleSubmit(e)}
                >
                Approve
                </Button>
                <Button
                className="form-button-pairs"
                variant="secondary"
                type="submit"
                value="REJ"
                onClick={(e) => handleSubmit(e)}
                >
                Decline
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