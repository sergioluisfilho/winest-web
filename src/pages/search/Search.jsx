import React, {useState, useEffect} from 'react'
import "./search.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import api from "../../api/axios";
import Wine from "../../components/wine/Wine"


function Search() {
  const [searchText, setSearchText] = useState("")
  const [wines, setWines] = useState([])

  const fetchWines = async () => {
    try {
      const response = await api.get('/wines', {
        params: {
          offset: 0,
          limit: 20,
        }
      })
      setWines([...wines, ...response.data])
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchWines()
  }, [])

  useEffect(() => {
    console.log(wines)
  }, [wines])

  const handleSearchWine = () => {
    alert('Search')
  }
  return (
    <div>
      <h1>Wine Search</h1>
      <div className="search">
          <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Today I'm looking for a dry red wine" />
          <Button onClick={handleSearchWine} color="primary">
            <SearchOutlinedIcon/>
          </Button>
        </div>
      <div className="categories">
         <button>
            Red
         </button>
         <button>
            White
          </button>
          <button>
            Sweet
          </button>
          <button>
            Dry
          </button>
          <button>
            Old
          </button>
      </div>
      <div className="wine-list">
      {wines.map(wine=>(
      <Wine wine={wine} key={wine.id}/>
    ))}
      </div>

    </div>
  )
}

export default Search