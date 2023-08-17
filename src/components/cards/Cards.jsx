import React from 'react';
import './Cards.scss';
import GenericWineImage from "../../assets/genericWine.png"
import Abbreviate from "../abbreviate/Abbreviate"

const Cards = ({wines}) => {
  return (
    <div className="card-grid">
      {wines.map((wine, index) => (
        <div key={index} className="card">
          <img src={GenericWineImage} alt={wine.title}/>
          <h3>
            <Abbreviate texto={wine.title}/>
          </h3>
          {/* <p><Abbreviate texto={wine.description}/></p> */}
          {/* <button></button> */}
        </div>
      ))}
    </div>
  );
};

export default Cards;
