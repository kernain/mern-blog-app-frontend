import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import { toast } from "react-toastify";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    axios.get("/auth/profile")
    .then((response) => {
      const userInfo = response.data;
      setUserInfo(userInfo);
    })
    
  }, []);

  async function logout() {
    const response = await axios.post("/auth/logout");
    setUserInfo(null);
    toast.success(response.data.message)
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new Blog</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
