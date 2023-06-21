import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "../components/Editor";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function createNewPost(ev) {
    ev.preventDefault();
    if (title && summary && files && content) {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("file", files[0]);
      
      const response = await axios.post("/post/create", data);
      if (response.status == 200) {
        toast.success(response.data.message);
        navigate("/");
      }
    } else toast.error("Please Fill the Required Fields!");
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      {/* <ReactQuill/> */}
      <Editor value={content} onChange={setContent} />
      <button className="button" style={{ marginTop: "5px" }}>
        Create post
      </button>
    </form>
  );
};

export default CreatePost;
