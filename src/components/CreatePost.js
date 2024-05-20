import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/configireFirebase";
import { selectUser } from "../features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser) || localStorage.getItem("loggedIn");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const postCollectionRef = collection(db, "posts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //connect to firebase
    await addDoc(postCollectionRef, {
      title: title,
      content: content,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
    // Reset form fields
    setTitle("");
    setContent("");
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
