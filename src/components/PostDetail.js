import React, { useEffect, useState, forwardRef } from "react";
import "./css/postDetail.css";
import db from "../firebase";
import Comment from "./Comment";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { Link } from "react-router-dom";
import Post from "./Post";

const PostDetail = forwardRef(({ match }, ref) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    db.collection("posts")
      .where("__name__", "==", `${match.params.id}`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setPost({ ...doc.data(), id: doc.id });
        });
      });

    db.collection("posts")
      .doc(match.params.id.toString())
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            parentID: match.params.id,
          }))
        )
      );
  }, [match.params.id]);

  return (
    <div className="postDetail" ref={ref}>
      <div className="feed__header">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <KeyboardBackspaceOutlinedIcon
            style={{ marginRight: "0.8em", cursor: "pointer" }}
          />
        </Link>
        <h2>Tweet</h2>
      </div>
      {post !== null && (
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
      )}
      {comments !== null &&
        comments.map((post) => (
          <Comment
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
            parentID={post.parentID}
          />
        ))}
    </div>
  );
});

export default PostDetail;
