import React, {useState} from 'react'
import GenericWineImage from "../../assets/genericWine.png"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import Abbreviate from "../abbreviate/Abbreviate"
import api from "../../api/axios";

function WineCard({wine, index}) {
  const [isLiked, setIsliked] = useState(wine.isLiked)

  const addWineToFavorites = async () => {
    try {
        await api.post(`/favorites/wines/${wine.id}`)
        setIsliked(true)
    } catch (error) {
        console.error(error)
    }
  }

  const removeWineFromFavorites = async () => {
    try {
        await api.delete(`/favorites/wines/${wine.id}`)
        setIsliked(false)
    } catch (error) {
        console.error(error)
    }
  }

  const handleAddWineToFavorite = () => {
    if (!isLiked) {
        addWineToFavorites()
    } else {
        removeWineFromFavorites()
    }
  }

  return (
    <div key={index} className="card">
        <div className='wine-img'>
            <img src={GenericWineImage} alt={wine.title}></img>
            {isLiked ?
                <FavoriteOutlinedIcon id="favorite" onClick={handleAddWineToFavorite} /> :
                <FavoriteBorderOutlinedIcon id="unfavorite" onClick={handleAddWineToFavorite}/>
            }
        </div>
        <h3 id="wine-name">
            <Abbreviate  texto={wine.title}/>
        </h3>
  </div>
  )
}

export default WineCard