import Post from "../post/Post";
import {useState, useEffect} from "react"
import "./posts.scss";
import api from "../../api/axios";

const Posts = ({reload, filterPostsByUserId}) => {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts', {
        params: {
          offset: 0,
          limit: 20,
          userId: filterPostsByUserId ? filterPostsByUserId : null // Tratamento para pagina de perfil
        }
      })
      setPosts(response.data.posts)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [reload]); // Adiciona reload como dependência


  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
