import React, { useEffect, useState } from "react";
import "./styles.css";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/configireFirebase";
import { selectUser } from "../features/auth/userSlice";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { doc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const user = useSelector(selectUser) || localStorage.getItem("loggedIn");
  const isDarkTheme = true;

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  const deletePost = async (id) => {
    const postRef = doc(db, "posts", id);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {
      await deleteDoc(doc(db, "posts", id));
    } else {
      console.log("Post does not exist.");
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostList(postsData);
    };

    fetchPosts();
  }, [deletePost]);
  return (
    <div className="homepage-container">
      <h1>Welcome to My Blog</h1>

      <div className="posts-list">
        {postList.map((post) => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {user && post.author.id === auth.currentUser.uid ? (
              <FaTrash
                className="trash-icon"
                onClick={() => deletePost(post.id)}
              />
            ) : (
              <p />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
