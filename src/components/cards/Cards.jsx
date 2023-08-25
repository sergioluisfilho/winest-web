import React from 'react';
import './Cards.scss';
import GenericWineImage from "../../assets/genericWine.png"
import Abbreviate from "../abbreviate/Abbreviate"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const Cards = ({wines}) => {
  return (
    <div className="card-grid">
      {wines.map((wine, index) => (
        <div key={index} className="card">
          <div className='wine-img'>
          <img src={GenericWineImage} alt={wine.title}></img>
          <FavoriteOutlinedIcon />
          </div>
          <h3>
            <Abbreviate texto={wine.title}/>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Cards;
