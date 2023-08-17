import Post from "../post/Post";
import {useState, useEffect} from "react"
import "./posts.scss";
import api from "../../api/axios";
import Button from "@mui/material/Button";

const Posts = ({filterPostsByUserId}) => {
  const [posts, setPosts] = useState([])
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
  })

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts', {
        params: {
          ...filters,
          userId: filterPostsByUserId ? filterPostsByUserId : null // Tratamento para pagina de perfil
        }
      })
      return data
    } catch (error) {
      console.log(error.message)
    }
  }
  // useEffect(() => {

  // }, [reload]); // Adiciona reload como dependência

  useEffect(() => {
    fetchPosts().then(data=>{
      setPosts([...posts, ...data.posts])
    })
  }, [filters]); // Adiciona reload como dependência


  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
    <Button onClick={()=>{
          setFilters({
          ...filters,
          offset: filters.offset + 10,
          })
    }}>See more...</Button>
  </div>;
};

export default Posts;
