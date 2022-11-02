import "../../styles/Posts.css";
import { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import UserPost from "./UserPost";

function UserPostList() {
  const [userPosts, setUserPosts] = useState([]);
  const [filter, setFilter] = useState("DRA");

  const handleError = (err) => {
    console.warn(err);
  };

  const getUserPosts = useCallback(async () => {
    const response = await fetch("/api/v1/posts/user/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setUserPosts(data);
    }
  }, []);

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  const filteredPosts = userPosts
    .filter((post) => (filter ? post.status === filter : post))
    .map((post) => <UserPost key={post.id} post={post} />);

  const changeCategory = (value) => {
    setFilter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="display">
        <section className="post-container">
          <section className="author-buttons">
            <Button
              className="author-button"
              variant="primary"
              value="DRA"
              onClick={(e) => changeCategory(e.target.value)}
            >
              Saved Posts
            </Button>
            <Button
              className="author-button"
              variant="primary"
              value="SUB"
              onClick={(e) => changeCategory(e.target.value)}
            >
              Created Posts
            </Button>
          </section>
          <section className="author-article-list margin-section">
            <ul className="list-container">{filteredPosts}</ul>
          </section>
        </section>
      </div>
    </>
  );
}

export default UserPostList;