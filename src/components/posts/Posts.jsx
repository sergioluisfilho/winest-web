import Post from "../post/Post";
import {useState, useEffect, useContext} from "react"
import "./posts.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Posts = () => {
  const [posts, setPosts] = useState([])
  const { token } = useContext(AuthContext);

  useEffect(()=>{
    axios.get('http://localhost:3000/posts?offset=0&limit=20',{headers: {'Content-Type': 'application/json', 'Authorization':token}})
    .then((response)=> {
      console.log(response.data.posts)
      setPosts(response.data.posts)
    })
  }, [])
  //TEMPORARY
  // const posts = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     userId: 1,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
  //   },
  // ];

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
