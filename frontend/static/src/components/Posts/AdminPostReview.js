import "../../styles/Post-styles/AdminPostReview.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";


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

    return (
    <article className="detail-view">
        {state && (
        <div className="article-view">
            {/* <img className="highlight-img" src={state.image} alt="news article image" /> */}
            <h2 className="highlight-post">{state.teamname}</h2>
            <p className="highlight-post">{state.organization}</p>
            <p className="highlight-post">{state.location}</p>
            <p className="highlight-post">{state.date}</p>
            <p className="highlight-post">{state.time}</p>
            <p className="highlight-post">{state.notes}</p>
            {state.status === "SUB" && (
            <>
                <Button
                className="form-button-pairs"
                variant="dark"
                type="submit"
                value="PST"
                onClick={(e) => handleSubmit(e)}
                >
                Post
                </Button>
                <Button
                className="form-button-pairs"
                variant="dark"
                type="submit"
                value="REJ"
                onClick={(e) => handleSubmit(e)}
                >
                Reject
                </Button>
            </>
            )}
            {state.status === "PST" && (
            <>
                <Button
                className="form-button-pairs"
                variant="dark"
                type="submit"
                value="ARC"
                onClick={(e) => handleSubmit(e)}
                >
                Archive
                </Button>
            </>
            )}
            {state.status === "ARC" && (
            <>
                <Button
                className="form-button-pairs"
                variant="dark"
                type="submit"
                value="PST"
                onClick={(e) => handleSubmit(e)}
                >
                Re-Publish
                </Button>
            </>
            )}
        </div>
        )}
    </article>
    );
}
    
export default AdminPostReview;