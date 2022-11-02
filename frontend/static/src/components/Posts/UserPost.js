import { Link } from "react-router-dom";

function UserPost({ post }) {
  return (
    <li key={post.id} className="list creator-list">
      <div className="post-info">
        <p className="user-post-data">{post.teamname}</p>
        <p className="user-post-data">{post.category}</p>
        <p className="user-post-data">{post.location}</p>
        <p className="user-post-data">{post.date}</p>
        <p className="user-post-data">{post.time}</p>
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