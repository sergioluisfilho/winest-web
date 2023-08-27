import React, {useState, useEffect} from 'react'
import "./favorites.scss";
import FavoritesList from "../../components/favoritesList/FavoritesList";
import api from "../../api/axios";

function Favorites() {
  const [wines, setWines] = useState([])

  const fetchWines = async () => {
    try {
      const response = await api.get('/favorites/wines')
      return response.data.favoriteWines
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRemoveFromFavorites = (wineId) => {
    setWines(prevFavWines => prevFavWines.filter(favorite => favorite.wine.id !== wineId));
  }

  useEffect(() => {
    fetchWines().then((data)=>{
      console.log(data)
      setWines(data)
    })
  }, [])

  return (
    <div className="favorites-page-container">
      <h1>Favorites</h1>
      <FavoritesList wines={wines} onRemove={handleRemoveFromFavorites}/>
    </div>
  )
}

export default Favorites