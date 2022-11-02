import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPost from "./EditPost";

function UserPostDetailView() {
  const [state, setState] = useState();

  const { id } = useParams();

  const handleError = (err) => {
    console.warn(err);
  };

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

  return <article className="detail-view">{state && <EditPost state={state} />}</article>;
}

export default UserPostDetailView;