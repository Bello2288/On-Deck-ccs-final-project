import "../../styles/Posts.css";
import Button from "react-bootstrap/Button";
import AdminPost from "./AdminPost";
import { useState, useCallback, useEffect } from "react";

function AdminPostList() {
  const [adminPosts, setAdminPosts] = useState([]);
  const [filter, setFilter] = useState("PST");

  const handleError = (err) => {
    console.warn(err);
  };

  const getAdminPosts = useCallback(async () => {
    const response = await fetch("/api/v1/posts/admin/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setAdminPosts(data);
    }
  }, []);

  useEffect(() => {
    getAdminPosts();
  }, [getAdminPosts]);

  const postList = adminPosts
    .filter((post) => (filter ? post.status === filter : post))
    .map((post) => <AdminPost key={post.id} post={post} />);

  const changeCategory = (value) => {
    setFilter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="display">
        <section className="admin-buttons">
          <Button
            className="admin-button"
            variant="outline-dark"
            value="PST"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Posted Games
          </Button>
          <Button
            className="admin-button"
            variant="outline-dark"
            value="SUB"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Submitted Games
          </Button>
          <Button
            className="admin-button"
            variant="outline-dark"
            value="ARC"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Archived Games
          </Button>
        </section>
        <section className="author-article-list margin-section">
          <ul className="list-container">{postList}</ul>
        </section>
      </div>
    </>
  );
}


export default AdminPostList;