import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import api from "../../api/axios";

const Profile = () => {
  const params = useParams();
  const { currentUser } = useContext(AuthContext);
  const [ userData, setUserData ] = useState({
    profilePictureUrl: '',
    name: '',
    bio: '',
  })

  const getUserProfile = async (id) => {
    try {
      const { data } = await api.get(`/page/${id}`)
      setUserData(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const {id} = params;
    getUserProfile(id)
  }, [])

  const checkIsCurrentUserProfilePage = () => { // Vamos usar para habilitar funcoes de edicao na pagina
    if (currentUser.id != params.id) {
      return false
    }

    return true
  }

  return (
    <div className="profile">
      <div className="images">
        <img
          src={userData.profilePictureUrl}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          {/* <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div> */}
          <div className="center">
            <span>{userData.name}</span>
            <div className="info">
              <div className="item">
                <span>{userData.bio}</span>
              </div>
              {/* <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div> */}
            </div>
            {/* <button>follow</button> */}
          </div>
          {/* <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div> */}
        </div>
      <Posts 
        filterPostsByUserId={params.id} // A passagem desse id infere que esses posts serao filtrados por um userId
      />
      </div>
    </div>
  );
};

export default Profile;
