import "../../styles/Post-styles/AdminPost.css";
import { Link } from "react-router-dom";
import moment from 'moment';


function AdminPost({ post }) { 
  return (
    <li key={post.id} className="list creator-list post-spacing">
      <div className="post-info">
        <h3 className="user-post-title">{post.title}</h3>
        <h3 className="user-post-data">{post.teamname}</h3>
        {/* <p className="user-post-data">{post.location}</p> */}
        <p className="user-post-data">{moment(post.date).format('MMM Do, YYYY')}&nbsp; at&nbsp; {moment(post.time, "HH:mm:ss").format('h:mm a')}</p>
        <span>By:&nbsp;&nbsp; {post.author_name}</span>
          <Link className="view-link" to={`/posts/editor/${post.id}`}>
            View Post
          </Link>
      </div>
      {/* <img className="aside-image" src={post.image} alt="post" /> */}
    </li>
  );
}

export default AdminPost;