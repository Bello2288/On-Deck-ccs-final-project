import { Link } from "react-router-dom";

function UserPost({ post }) {
  return (
    <li key={post.id} className="list creator-list">
      <div className="post-info">
        <h3 className="user-post-data">{post.teamname}</h3>
        <h3 className="user-post-data">{post.location}</h3>
        <h3 className="user-post-data">{post.date}</h3>
        <h3 className="user-post-data">{post.time}</h3>
        <span>By {post.author_name}</span>
        <div className="view-button">
          <Link className="view-link" to={`/post/${post.id}`}>
            View Post
          </Link>
        </div>
      </div>
      {/* <img className="aside-image" src={post.image} alt="post" /> */}
    </li>
  );
}

export default UserPost;