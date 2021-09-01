import React, { useState, useEffect, useRef } from "react";
import "./css/feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import db from "../firebase";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            createdAt={post.createdAt}
            retweet={post.retweet}
            liked={post.liked}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
