import "../../styles/Post-styles/UserPost.css";
import { Link } from "react-router-dom";
import moment from 'moment';

function UserPost({ post }) {
  console.log('post', post)
  return ( 
    <li key={post.id} className="list creator-list"> 
      <div className="post-info">
        <div>
          <h2 className="user-post-title">{post.title}</h2>
        </div>
        <div>
          <p>{post.category} - {post.location}</p> 
          <p>{moment(post.date).format('MMM Do, YYYY')} at {moment(post.time, "HH:mm:ss").format('h:mm a')}</p>
        </div>
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