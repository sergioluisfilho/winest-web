import React from 'react';
import './Favorites.scss';
import FavoriteWineCard from '../favoriteWineCard/FavoriteWineCard';

const FavoritesList = ({wines, onRemove}) => {
  const favorites = wines

  return (
    <div className="card-grid">
      {favorites.map(({wine}, index) => (
        <FavoriteWineCard 
           wine={wine}
           key={index} 
           onRemove={onRemove} // Passa a função de remoção para o componente filho
        />
      ))}
    </div>
  );
};

export default FavoritesList;
