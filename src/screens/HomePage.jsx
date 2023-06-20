import axios from "axios";
import Post from "../components/Post";
import {useEffect, useState} from "react";

export default function HomePage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    axios.get('/post/get').then(response => setPosts(response.data))
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} key={post._id} />
      ))}
    </>
  );
}