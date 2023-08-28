import React from 'react'
import GenericWineImage from "../../assets/genericWine.png"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import Abbreviate from "../abbreviate/Abbreviate"
import api from "../../api/axios";

function FavoriteWineCard({wine, index, onRemove}) {

  const removeWineFromFavorites = async () => {
    try {
        await api.delete(`/favorites/wines/${wine.id}`)
        onRemove(wine.id); // Notifica o componente pai sobre a remoção
    } catch (error) {
        console.error(error)
    }
  }

  const handleRemoveWineFromFavorites = () => {
        removeWineFromFavorites()
  }

  return (
    <div key={index} className="card">
        <div className='wine-img'>
            <img src={GenericWineImage} alt={wine.title}></img>
                <FavoriteOutlinedIcon id="unfavorite-icon" onClick={handleRemoveWineFromFavorites}/>
        </div>
        <h3>
            <Abbreviate texto={wine.title}/>
        </h3>
  </div>
  )
}

export default FavoriteWineCard