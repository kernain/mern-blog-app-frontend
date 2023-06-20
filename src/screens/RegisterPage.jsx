import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function register(ev) {
    ev.preventDefault();
    if (!username == "" && !password == "") {
      const response = await axios.post("/auth/register", {
        username,
        password,
      });

      if (response.data.error.code == 11000) {
        toast.error("Email Already Exist!");
      } else {
        toast.success("Successfully Registered");
        navigate("/login");
      }
    }else toast.error("Please Fill the Required Fields!");
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button className="button">Register</button>
    </form>
  );
}
