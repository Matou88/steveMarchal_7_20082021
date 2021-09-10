import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Post from "../components/Post";
import axios from "axios";

const Allposts = () => {
    const [newsData, setNewsData] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = () => {
      axios
        .get("http://localhost:3300/api/post")
        .then((res) => setNewsData(res.data));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
        axios
          .post("http://localhost:3300/api/post", {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
            author,
            content,
            date: Date.now(),
          })
          .then(() => {
            setError(false);
            setAuthor("");
            setContent("");
            getData();
          })
      }
    
    return (
        <div className="allposts text-center">
            <Navigation />
            <h1>C'est ici que l'on s'exprime !!!</h1>
            <div className="post mt-4">
              <form onSubmit={(e) => handleSubmit(e)}>
                <textarea
                className="textarea"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ecrivez votre message"
                value={content}>
                </textarea>
              <div>
                <input type="submit" value="Envoyer" />
              </div>
              </form>
            </div>

      <ul>
        {newsData
          .sort((a, b) => b.date - a.date)
          .map((post) => (
            <Post key={post.id} post={post} user={this.props.user} />
          ))}
      </ul>
    </div>
  );
};

export default Allposts;