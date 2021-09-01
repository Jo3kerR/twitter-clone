import React, { forwardRef, useState, useEffect } from "react";
import "./css/post.css";
import { Avatar } from "@material-ui/core";
import {
  ChatBubble,
  FavoriteBorder,
  Publish,
  Repeat,
  VerifiedUser,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import db from "../firebase";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  medium: {
    // width: theme.spacing(6),
    // height: theme.spacing(6),
    width: "2em",
    height: "2em",
  },
}));

const Post = forwardRef(
  (
    {
      avatar,
      displayName,
      username,
      verified,
      text,
      image,
      createdAt,
      retweet,
      liked,
      id,
    },
    ref
  ) => {
    const classes = useStyles();
    const postRetweet = async () => {
      await db.collection("posts").add({
        displayName: displayName,
        username: username,
        verified: verified,
        text: text,
        image: image,
        avatar:
          "https://pbs.twimg.com/profile_images/997180500090351616/d0shaE6m_400x400.jpg",
        createdAt: new Date(),
        retweet: true,
        liked: false,
      });
    };

    const [isLiked, setIsLiked] = useState(liked);

    useEffect(() => {
      db.collection("posts").doc(id.toString()).update({
        liked: isLiked,
      });
    }, [isLiked]);
    const toggleLike = () => {
      setIsLiked(!isLiked);
    };

    const deletePost = () => {
      db.collection("posts")
        .where("createdAt", "==", createdAt)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (id === doc.id) db.collection("posts").doc(doc.id).delete();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div className="post" ref={ref}>
        {retweet && (
          <div className="post__retweet">
            <div className="post__retweetText">
              <Repeat fontSize="small" className="retweetIcon" /> {displayName}{" "}
              retweeted
            </div>
            <DeleteOutlineIcon onClick={deletePost} className="deleteIcon" />
          </div>
        )}
        <div className="post__original">
          <div className="post__avatar">
            <Avatar className={classes.medium} src={avatar} />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div className="post__headerWithDelete">
                <div className="post__headerText">
                  <h3>
                    <span className="post__displayName">{displayName}</span>{" "}
                    <span className="post__headerSpecial">
                      {verified && <VerifiedUser className="post__badge" />} @
                      {username} &bull; {moment(createdAt).fromNow()}
                    </span>
                  </h3>
                </div>
                {!retweet && (
                  <DeleteOutlineIcon
                    onClick={deletePost}
                    className="deleteIcon"
                  />
                )}
              </div>
              <Link to={`/post/${id}`}>
                <div className="post__headerDescription">
                  <p
                    style={{
                      whiteSpace: "pre-line",
                      overflowWrap: "break-word",
                    }}
                  >
                    {text}
                  </p>
                </div>
              </Link>
            </div>
            <img src={image} />
            <div className="post__footer">
              <ChatBubble fontSize="small" className="replyIcon" />
              {!retweet && (
                <Repeat
                  onClick={postRetweet}
                  fontSize="small"
                  className="retweetIcon"
                />
              )}
              {retweet && (
                <Repeat
                  fontSize="small"
                  className="retweetIcon post__retweeted"
                />
              )}
              <FavoriteBorder
                onClick={toggleLike}
                fontSize="small"
                className="likeIcon"
                style={{ color: isLiked ? "rgb(248, 32, 32)" : "gray" }}
              />
              <Publish fontSize="small" className="shareIcon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
