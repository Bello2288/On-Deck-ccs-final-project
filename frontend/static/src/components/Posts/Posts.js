import "../../styles/Posts.css";
import { useState, useCallback, useEffect } from "react";
import PostDisplay from "./PostDisplay";
import Button from "react-bootstrap/Button";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState();
  const [filter, setFilter] = useState("HK");

  const handleError = (err) => {
    console.warn(err);
  };

  const getPosts = useCallback(async () => {
    const response = await fetch("/api/v1/posts/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setPosts(data);
      setActivePost(data[0]);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filteredPosts = posts.filter((post) =>
    filter ? post.category == filter : post
  );

  const changeCategory = (value) => {
    setFilter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setActivePost(filteredPosts[0]);
  }, [filter]);

  return (
    <div className="display">
      <section className="sort-buttons">
        <Button
          className="sort-button"
          variant="primary"
          value="FB"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Flag-Football
        </Button>
        <Button
          className="sort-button"
          variant="primary"
          value="HK"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Hockey
        </Button>
        <Button
          className="sort-button"
          variant="primary"
          value="SB"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Softball
        </Button>
        <Button
          className="sort-button"
          variant="primary"
          value="BK"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Basketball
        </Button>
      </section>
      <section className="main-display">
        {activePost && <PostDisplay activePost={activePost} />}
      </section>
    </div>
  );
}

export default Posts;