import React, {useState, useEffect} from 'react'
import "./search.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import Cards from "../../components/cards/Cards";
import api from "../../api/axios";
// import Wine from "../../components/wine/Wine"


function Search() {
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
    search: '',
  })

  const [wines, setWines] = useState([])

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

  const fetchIASuggestions = async () => {
    try {
      const { data } = await api.post('/wines/sugest')
      console.log(data)
      data?.content && alert(data.content)
    } catch (error) {
      console.log(error)
    }
  }

  const handleIASuggestion = () => {
    fetchIASuggestions()
  }



  return (
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
            <Button color="primary">
              <SearchOutlinedIcon/>
            </Button>
        </div>
        <p>Can't find anything? try our <button onClick={handleIASuggestion}>A.I. recommendation</button></p>
      <Cards wines={wines}/>
      <Button onClick={handleSeeMore}>See more...</Button>
    </div>
  )
}

export default Search