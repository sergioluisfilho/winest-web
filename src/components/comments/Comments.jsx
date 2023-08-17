import { useContext, useState, useEffect } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import api from "../../api/axios";

const Comments = ({postId, onNewCommentCreated}) => {
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]) 
  const [content, setContent] = useState("")

  useEffect(()=>{
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const { data } = await api.get(`/posts/${postId}/comments`)
      setComments(data?.comments)
    } catch (error) {
      console.log(error.message)
    }
  }

  const createComment = async (content) => {
    try {
      await api.post(`/posts/${postId}/comments`, {content})
      onNewCommentCreated()
      fetchComments()
      setContent("")
    } catch (error) {
      console.log(error.message)
    }
  }


  const handleComment = e => {
    e.preventDefault();
    createComment(content)
  //   setComments(
  //     [
  //       {
  //     id: 1,
  //     createdAt: "2023-07-19T00:11:42.884Z",
  //     content: "Adorei o post!",
  //     postId: 1,
  //     userId: 1,
  //     User: {
  //         id: 1,
  //         name: "Sérgio Cruz",
  //         profilePictureUrl: "https://winestimages.s3.us-east-2.amazonaws.com/1689777107372-Screen%20Shot%202023-07-19%20at%2010.45.39.png"
  //     }
  //   },
  // ...comments
  //     ]
  //   )
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={handleComment}>Send</button>
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
