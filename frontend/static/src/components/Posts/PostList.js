import "../../styles/Post-styles/PostList.css";
import moment from 'moment';
import { Link } from "react-router-dom";


function PostList({ updateDisplay, filteredPosts }) {
  const postList = filteredPosts
    .map((post) => (
      <li key={post.id} onClick={() => updateDisplay(post.id)}>
        <div className="post-info"> 
            <h2>{post.title}</h2>
            <p>{post.location}</p>
            <p>{moment(post.date).format('MMMM Do, YYYY')}</p>
            <p>{moment(post.time, "HH:mm:ss").format('h:mm a')}</p>
            <span>By {post.author_name}</span>
            <Link className="view-link" to={`/post/${post.id}`}>
            View Post
            </Link>
        </div>
        <img src={post.image} />
      </li>
    ));
  return <ul className="pst-list">{postList}</ul>;
}

export default PostList;