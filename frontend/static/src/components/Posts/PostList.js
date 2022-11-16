import "../../styles/Post-styles/PostList.css";
import moment from 'moment';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader"


function PostList({ filteredPosts }) {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

    }, 900)
  },[])


  const postList = filteredPosts
    .map((post) => (
      <li key={post.id} className="post-spacing">
        <div className="post-info">
            <div>
              <h2 className="post-list-title">{post.title}</h2>
            </div>
            <div className="post-list-content">
              <p>{post.category} - {post.location}</p> 
              <p>{moment(post.date).format('MMM Do, YYYY')} at {moment(post.time, "HH:mm:ss").format('h:mm a')}</p>
            </div>
            <div>             
              <Link className="view-link" to={`/post/${post.id}`}>
                View Post
              </Link>
            </div>
        </div>
      </li> 
    ));
  // return <ul className="pst-list four">{postList}</ul>;
  return (
    <div className="spinner">
    {
      loading ? 
      <FadeLoader color={'#be691f'} loading={loading} size={200} />
      :
      <ul className="pst-list four">{postList}</ul>
    }
    </div>
  )
}


export default PostList;