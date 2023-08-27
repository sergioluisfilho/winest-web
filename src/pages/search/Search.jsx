import React, {useState, useEffect} from 'react'
import "./search.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import Cards from "../../components/cards/Cards";
import api from "../../api/axios";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [IAContent, setIAContent] = useState('');
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
    search: '',
  })

  const [wines, setWines] = useState([])

  // const [favorite, setFavorite] = useState(false);

  function checkLikedStatus(wines, favorites) {
    return wines.map(wine => {
        const isLiked = favorites.some(favorite => favorite.wine.id === wine.id);
        return { ...wine, isLiked };
    });
  }  

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

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites/wines')
      return response.data.favoriteWines
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Promise.all([fetchWines(), fetchFavorites()])
      .then(([wineData, favoriteData]) => {
        const winesWithFavoriteData = checkLikedStatus(wineData, favoriteData)
        setWines([...wines, ...winesWithFavoriteData]);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [filters]);
  

  const handleSeeMore = () => {
    setFilters({
        ...filters,
      offset: filters.offset + 10,
      })
  }

  const fetchIASuggestions = async () => {
    try {
      const { data } = await api.post('/wines/sugest')
      console.log(data)
      setIAContent(data?.content)
      setIsLoading(false)
      onOpenModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleIASuggestion = () => {
    setIsLoading(true)
    fetchIASuggestions()
  }

  // const favoriteWine = async () => {
  //   try {
  //     api.post(`/favorites/wines/`)
  //     setLiked(true)
  //     setLikesAmount(likesAmount+1)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
    <>
    <div className="search-page-container">
      <h1>Wine Search</h1>
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
        <div className='ai-desc'>

          {isLoading ? <p>loading...</p> : <>
          <span className='ai-tip'>Can't find anything? try our</span>
          <button className='ai-btn' onClick={handleIASuggestion}>A.I. Recommendation</button>
          </>}
        </div>
      <Cards wines={wines}/>
      <Button className='seeMore-btn'onClick={handleSeeMore}>See more...</Button>
    </div>
    <Modal open={open} onClose={onCloseModal} center>
      <h2>IA Sugestion:</h2>
      <p>
        {IAContent}
      </p>
    </Modal>
        </>
  )
}

export default Search