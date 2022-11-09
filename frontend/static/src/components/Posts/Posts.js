import "../../styles/Post-styles/Posts.css";
import { useState, useCallback, useEffect } from "react";
import PostList from "./PostList";
import Button from "react-bootstrap/Button";


function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");

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
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filteredPosts = posts.filter((post) =>
    filter ? post.category === filter : post
  );

  const changeCategory = (value) => {
    setFilter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="display">
      <section className="sort-buttons">
        <Button
          className="sort-button"
          variant="secondary"
          value=""
          onClick={(e) => changeCategory(e.target.value)}
        >
          All
        </Button>
        <Button
          className="sort-button"
          variant="secondary"
          value="Flag-Football"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Flag-Football
        </Button>
        <Button
          className="sort-button"
          variant="secondary"
          value="Hockey"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Hockey
        </Button>
        <Button
          className="sort-button"
          variant="secondary"
          value="Softball"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Softball
        </Button>
        <Button
          className="sort-button"
          variant="secondary"
          value="Basketball"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Basketball
        </Button>
      </section> 
      <section className="main-display">
          <PostList className="post-info" posts={posts} filteredPosts={filteredPosts} />
      </section>
    </div>
  );
}

export default Posts;