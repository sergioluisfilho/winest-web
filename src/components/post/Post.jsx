import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Comments from "../comments/Comments";
import { useState, useEffect, useContext } from "react";
import api from "../../api/axios";

function checkCurrentUserLiked(likesArray, userId) {
  for (const likeObject of likesArray) {
    const {user} = likeObject
    if (user.hasOwnProperty("id") && user.id === userId) {
      return true; 
    }
  }
  return false;
}

const Post = ({ post }) => {
  const {currentUser} = useContext(AuthContext)
  const [commentOpen, setCommentOpen] = useState(false);
  const [likesAmount, setLikesAmount] = useState(post.Like.length)
  const [commentAmount, setCommentAmount] = useState(post.Comment.length)

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const currentUserLiked = checkCurrentUserLiked(post.Like, currentUser.id)
    setLiked(currentUserLiked)
  }, [])

  const likePost = async () => {
    try {
      api.post(`/posts/${post.id}/like`)
      setLiked(true)
      setLikesAmount(likesAmount+1)
    } catch (error) {
      console.log(error)
    }
  }

  const dislikePost = async () => {
    try {
      api.delete(`/posts/${post.id}/like`)
      setLiked(false)
      setLikesAmount(likesAmount-1)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
    if (!liked) {
      await likePost()
    } else {
      await dislikePost()
    }
  }

  const handleNewcomment = () => {
    setCommentAmount(commentAmount+1)
  }
  

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.author.profilePictureUrl} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.author.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.author.name}</span>
              </Link>
              <span className="date">{post.createdAt}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.content}</p>
          <img src={post.imgSource} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {likesAmount}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentAmount}
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && <Comments postId={post.id} onNewCommentCreated={handleNewcomment}/>}
      </div>
    </div>
  );
};

export default Post;
