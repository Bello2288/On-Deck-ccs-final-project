import "../../styles/Post-styles/PostList.css";
import moment from 'moment';
import { Link } from "react-router-dom";


function PostList({ filteredPosts }) {
  const postList = filteredPosts
    .map((post) => (
      <li key={post.id}>
        <div className="post-info"> 
            <h2 className="post-list-title">{post.title}</h2>
            <p>{post.location}</p>
            {/* <p>{post.organization}</p> */}
            <p>{moment(post.date).format('MMM Do, YYYY')} at {moment(post.time, "HH:mm:ss").format('h:mm a')}</p>
            {/* <span>By {post.author_name} : </span> */}
            <Link className="view-link" to={`/post/${post.id}`}>
              View Post
            </Link>
        </div>
      </li> 
    ));
  return <ul className="pst-list">{postList}</ul>;
}


export default PostList;