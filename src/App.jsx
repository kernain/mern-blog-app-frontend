import "./App.css";
import Homepage from "./screens/HomePage";
import Layout from "./components/Layout";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import CreatePost from "./screens/CreatePost";
import PostPage from "./screens/PostDetail";
import EditPost from "./screens/EditPost";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
      <ToastContainer />
    </UserContextProvider>
  );
}

export default App;
