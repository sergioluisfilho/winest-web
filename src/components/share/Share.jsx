import "./share.scss";
import Image from "../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import api from "../../api/axios";

const Share = () => {
  const [file, setFile] = useState(null)
  const [content, setContent] = useState("")

  const upload = async () => {
    const formData = new FormData();
    formData.append("image", file)
    formData.append("content", content)
    try {
      await api.post('/posts', formData)
      setContent("")
      setFile(null)
      window.location.reload();
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleClick = e => {
    e.preventDefault();
    upload();
  }

  const {currentUser} = useContext(AuthContext)
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input id="post-draft" type="text" placeholder={`What's on your mind ${currentUser.name}?`} value={content} onChange={(e) => setContent(e.target.value)}/>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button id="share-post" onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
