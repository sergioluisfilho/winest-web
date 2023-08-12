import "./leftBar.scss";
import { NavLink } from 'react-router-dom';
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* <div className="user">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div> */}
          <div>
            <NavLink to="/">
              {/* <img src={Friends} alt="" /> */}
              <span>Home</span>
            </NavLink>
          </div>
          <div>
            <NavLink to="/search">
              {/* <img src={Market} alt="" /> */}
              <span>Search</span>
            </NavLink>
          </div>
          <div>
            <NavLink to="/favorites">
              {/* <img src={Market} alt="" /> */}
              <span>Favorites</span>
            </NavLink>
          </div>
          <div>
            <NavLink to="/chats">
              {/* <img src={Messages} alt="" /> */}
              <span>Chats</span>
            </NavLink>
          </div>
          <div>
            <NavLink to={`/profile/${currentUser.id}`}>
              {/* <img src={Gallery} alt="" /> */}
              <span>Profile</span>
            </NavLink>
          </div>
          <div>
            <NavLink to="/notifications">
            {/* <img src={Market} alt="" /> */}
            <span>Notifications</span>
            </NavLink>
          </div>
          <div>
          <NavLink to="/settings">
            {/* <img src={Memories} alt="" /> */}
            <span>Settings</span>
          </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
