import React from 'react';
import './Cards.scss';
import WineCard from '../wineCard/WineCard';

const Cards = ({wines}) => {
  return (
    <div className="card-grid">
      {wines.map((wine, index) => (
        <WineCard wine={wine} index={index} key={index}/>
      ))}
    </div>
  );
};

export default Cards;
