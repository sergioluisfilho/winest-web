import React, {useState, useEffect} from 'react'
import "./favorites.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import Cards from "../../components/cards/Cards";
import api from "../../api/axios";
// import Wine from "../../components/wine/Wine"


function Favorites() {
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
    search: '',
  })

  const [wines, setWines] = useState([])

  // const [favorite, setFavorite] = useState(false);

  const fetchWines = async () => {
    try {
      const response = await api.get('/wines', {
        params: filters
      })

      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchWines().then((data)=>{
      setWines([...wines, ...data])
    })
  }, [filters])

  const handleSeeMore = () => {
    setFilters({
        ...filters,
      offset: filters.offset + 10,
      })
  }

  // const unfavoriteWine = async () => {
  //   try {
  //     api.delete(`/posts/${post.id}/like`)
  //     setLiked(false)
  //     setLikesAmount(likesAmount-1)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const handleFavorite = async () => {
  //   if (!favorite) {
  //     await favoriteWine()
  //   } else {
  //     await unfavoriteWine()
  //   }
  // }

  return (
    <div className="favorites-page-container">
      <h1>Favorites</h1>
      <div className="search">
          <input type="text" value={filters.search} onChange={(e) => {
          setWines([])
          setFilters({
            ...filters,
            offset: 0,
            search: e.target.value
          })}} placeholder="Nicosia 2013 Vulkà Bianco (Etna)"/>
            <Button className="search-btn">
              <SearchOutlinedIcon/>
            </Button>
        </div>
      <Cards wines={wines}/>
      <Button className='seeMore-btn'onClick={handleSeeMore}>See more...</Button>
    </div>
  )
}

export default Favorites