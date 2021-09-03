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

    // const getPost = () => {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; token=`);
    //     const token = parts.pop().split(';').shift();

    //     axios.get('http://localhost:3300/api/post?sort=createdAt&order=desc&include=user', {
    //         headers: {
    //             'Authorization': 'Bearer ' + token
    //         }
    //     })
    //         .then(res => {
    //             this.setState({ posts: res.data });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
    //         })
    // };
  
    const getData = () => {
      axios
        .get("http://localhost:3300/api/post")
        .then((res) => setNewsData(res.data));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
        axios
          .post("http://localhost:3300/api/post", {
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
        <div>
            <Navigation />
            <h1>C'est ici que l'on s'exprime !!!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
            style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ecrivez votre message"
            value={content}
            ></textarea>
            <input type="submit" value="Envoyer" />
            </form>

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