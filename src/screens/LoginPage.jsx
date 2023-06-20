import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { toast } from "react-toastify";


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext);

  const navigate = useNavigate();

  async function login(ev) {
    ev.preventDefault();
    const {data} = await axios.post("/auth/login", { username, password });
    if(data.id){

      setRedirect(true)
      setUserInfo(data)
      toast.success("Successfully Logged In")
      navigate("/")
    }else{
      toast.error(data.message)
    }

   
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="button">Log in</button>
    </form>
  );
}
