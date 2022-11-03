import "../../styles/Posts.css";

function PostDisplay({ activePost }) {
  return (
    <article className="highlight-article">
      {/* <img className="highlight-img" src={activePost.image} alt="" /> */}
      <h2 className="highlight-title">{activePost.teamname}</h2>
      <p className="highlight-body">{activePost.organization}</p>
    </article>
  );
}

export default PostDisplay;