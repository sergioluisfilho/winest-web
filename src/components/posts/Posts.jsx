import Post from "../post/Post";
import {useState, useEffect} from "react"
import "./posts.scss";
import api from "../../api/axios";

const Posts = () => { // Adicionar tratamento para se essa chamada for uma pagina de perfil
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    api.get('/posts?offset=0&limit=20')
    .then((response)=> {
      setPosts(response.data.posts)
    })
  }, [])

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
