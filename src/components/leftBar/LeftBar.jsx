import "./leftBar.scss";
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Home from "../../assets/home.svg"
import Search from "../../assets/search.svg"
import Settings from "../../assets/Settings-3.svg"
// import Message from "../../assets/Union.svg"
// import Notifications from "../../assets/Notifications.svg"
// import Favorites from "../../assets/favorites.svg"
import Profile from "../../assets/profile.svg"


const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div>
            <NavLink to="/">
              <img src={Home} alt="" />
            </NavLink>
          </div>
          <div>
            <NavLink to="/search">
              <img src={Search} alt="" />
            </NavLink>
          </div>
          {/* <div>
            <NavLink to="/favorites">
              <img src={Favorites} alt="" />
            </NavLink>
          </div> */}
          {/* <div>
            <NavLink to="/chats">
              <img src={Message} alt="" />
            </NavLink>
          </div> */}
          <div>
            <NavLink to={`/profile/${currentUser.id}`}>
              <img src={Profile} alt="" />
            </NavLink>
          </div>
          {/* <div>
            <NavLink to="/notifications">
            <img src={Notifications} alt="" />
            </NavLink>
          </div> */}
          <div>
          <NavLink to="/settings">
            <img src={Settings} alt="" />
          </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
