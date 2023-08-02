import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";

const Comments = ({data}) => {
  console.log(data)
  const { currentUser } = useContext(AuthContext);
  const comments = data

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.User.profilePictureUrl} alt="" />
          <div className="info">
            <span>{comment.User.name}</span>
            <p>{comment.content}</p>
          </div>
          <span className="date">{comment.createdAt}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
