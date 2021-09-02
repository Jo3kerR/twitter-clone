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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import TweetBox from "./TweetBox";

const useStyles = makeStyles((theme) => ({
  medium: {
    // width: theme.spacing(6),
    // height: theme.spacing(6),
    width: "2em",
    height: "2em",
  },
  modal: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "2em",
  },
  paper: {
    backgroundColor: "black",
    color: "white",
    border: "0.5px solid white",
    borderRadius: "1.4em",
    boxShadow: theme.shadows[5],
    padding: "1em 1em 1em",
    outline: "none",
    maxWidth: "500px",
    minWidth: "30%",
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

    const [isLiked, setIsLiked] = useState(liked);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
      db.collection("posts").doc(id.toString()).update({
        liked: isLiked,
      });
    }, [isLiked, id]);
    const toggleLike = () => {
      setIsLiked(!isLiked);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const postRetweet = () => {
      db.collection("posts").add({
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

    const deletePost = () => {
      db.collection("posts")
        .where("__name__", "==", `${id}`)
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
              <Link
                to={`/post/${id}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
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
            {image && (
              <Link to={{ pathname: `${image}` }} target="_blank">
                <img src={image} />
              </Link>
            )}
            <div
              className="post__footer"
              style={{
                marginTop: "1em",
              }}
            >
              <ChatBubble
                fontSize="small"
                className="replyIcon"
                onClick={handleOpen}
              />
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
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <CloseIcon onClick={handleClose} />
                    <TweetBox
                      isComment={true}
                      id={id}
                      handleClose={handleClose}
                      isModal={true}
                    />
                  </div>
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
