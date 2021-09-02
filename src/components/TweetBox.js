import React, { useState, useRef } from "react";
import "./css/tweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import db from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import {
  EmojiEmotionsOutlined,
  GifOutlined,
  ImageOutlined,
} from "@material-ui/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useOuterClick } from "react-outer-click";

function TweetBox({ isComment, id, handleClose, isModal }) {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [tweetImageDisplay, setTweetImageDisplay] = useState({
    display: "none",
  });
  const [emojiPicker, setEmojiPicker] = useState({
    display: "none",
  });
  const el = useRef(null);

  const useStyles = makeStyles((theme) => ({
    medium: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      cursor: "pointer",
    },
  }));
  const classes = useStyles();

  const toggleImageInput = () => {
    if (tweetImageDisplay.display === "none") {
      setTweetImageDisplay({
        display: "block",
      });
    } else {
      setTweetImageDisplay({
        display: "none",
      });
    }
  };
  const toggleEmojiPicker = () => {
    if (emojiPicker.display === "none") {
      setEmojiPicker({
        display: "block",
      });
    } else {
      setEmojiPicker({
        display: "none",
      });
    }
  };
  const closeEmojiPicker = () => {
    if (emojiPicker.display === "block") {
      setEmojiPicker({
        display: "none",
      });
    }
  };
  useOuterClick(el, () => {
    closeEmojiPicker();
  });

  const addEmoji = (e) => {
    setTweetMessage(tweetMessage + e.native);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    if (tweetMessage === "" && tweetImage === "") return;
    if (!isComment) {
      db.collection("posts").add({
        displayName: "John Doe",
        username: "johndoe",
        verified: true,
        text: tweetMessage,
        image: tweetImage,
        avatar:
          "https://pbs.twimg.com/profile_images/997180500090351616/d0shaE6m_400x400.jpg",
        createdAt: new Date(),
        retweet: false,
        liked: false,
      });
    } else {
      db.collection("posts").doc(id.toString()).collection("comments").add({
        displayName: "John Doe",
        username: "johndoe",
        verified: true,
        text: tweetMessage,
        image: tweetImage,
        avatar:
          "https://pbs.twimg.com/profile_images/997180500090351616/d0shaE6m_400x400.jpg",
        createdAt: new Date(),
        retweet: false,
        liked: false,
      });
      handleClose();
    }
    setTweetImage("");
    setTweetMessage("");
  };

  return (
    <div
      className="tweetBox"
      style={{
        borderBottom: isModal ? "none" : "",
      }}
    >
      <form>
        <div className="tweetBox__input">
          <Avatar
            className={classes.medium}
            src="https://pbs.twimg.com/profile_images/997180500090351616/d0shaE6m_400x400.jpg"
          />
          <div className="grow-wrap">
            <textarea
              value={tweetMessage}
              onChange={(e) => setTweetMessage(e.target.value)}
              type="text"
              placeholder={isComment ? "Tweet your reply" : "What's happening?"}
            />
          </div>
        </div>
        <input
          style={tweetImageDisplay}
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__inputImage"
          type="text"
          placeholder="Optional : Enter Image/GIF URL"
        />
        <div className="tweetBox__buttons">
          <ImageOutlined
            className="tweetBox__attachment"
            onClick={toggleImageInput}
          />
          <GifOutlined
            className="tweetBox__attachment"
            onClick={toggleImageInput}
          />
          <EmojiEmotionsOutlined
            className="tweetBox__attachment"
            onClick={toggleEmojiPicker}
          />
          <Button
            onClick={sendTweet}
            type="submit"
            className="tweetBox__tweetButton"
            style={{
              cursor: tweetMessage || tweetImage ? "pointer" : "auto",
            }}
          >
            {isComment ? `Reply` : `Tweet`}
          </Button>
        </div>
      </form>
      <div ref={el}>
        <Picker
          style={emojiPicker}
          onSelect={addEmoji}
          set="twitter"
          title="Pick your emoji…"
          emoji="point_up"
          theme="dark"
        />
      </div>
    </div>
  );
}

export default TweetBox;
