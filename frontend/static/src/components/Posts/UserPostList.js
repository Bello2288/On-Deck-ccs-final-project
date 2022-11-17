import "../../styles/Post-styles/UserPostList.css";
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
      <div className="my-posts-display">
        <section className="post-container">
          <section className="author-buttons">
            <Button
              autoFocus
              className="author-button"
              variant="secondary"
              value="DRA"
              onClick={(e) => changeCategory(e.target.value)}
            >
              Saved Game Posts
            </Button>
            <Button
              className="author-button"
              variant="secondary"
              value="SUB"
              onClick={(e) => changeCategory(e.target.value)}
            >
              Posts Waiting on Approval
            </Button>
            <Button
              className="author-button"
              variant="secondary"
              value="TKS"
              onClick={(e) => changeCategory(e.target.value)}
            >
              Reserved Game Posts
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