import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import Editor from "../components/Editor";
import { toast } from "react-toastify";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/post/get/" + id).then((response) => {
      setTitle(response.data.title);
      setContent(response.data.content);
      setSummary(response.data.summary);
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await axios.put("/post/edit", data);
    if (response.status == 200) {
      toast.success(response.data.message);
      navigate(`/post/${id}`);
    }
  }

  //   if (redirect) {
  //     return <Navigate to={'/post/'+id} />
  //   }

  return (
    <form onSubmit={updatePost}>
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
      <Editor onChange={setContent} value={content} />
      <button className="button" style={{ marginTop: "5px" }}>
        Update post
      </button>
    </form>
  );
}
