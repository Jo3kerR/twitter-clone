import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import "./css/sidebar.css";
import SidebarOption from "./SidebarOption";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import TweetBox from "./TweetBox";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="sidebar">
      <div className="sticky">
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          <TwitterIcon className="sidebar__twitterIcon" />
          <SidebarOption active text="Home" Icon={HomeIcon} />
        </Link>
        <SidebarOption text="Explore" Icon={SearchOutlinedIcon} />
        <SidebarOption text="Notifications" Icon={NotificationsOutlinedIcon} />
        <SidebarOption text="Messages" Icon={MailOutlineIcon} />
        <SidebarOption text="Bookmarks" Icon={BookmarkBorderOutlinedIcon} />
        <SidebarOption text="Lists" Icon={ListAltOutlinedIcon} />
        <SidebarOption text="Profile" Icon={PersonOutlineOutlinedIcon} />
        <SidebarOption text="More" Icon={MoreHorizOutlinedIcon} />
        <Button
          onClick={handleOpen}
          variant="outlined"
          className="sidebar__tweet"
          fullWidth
        >
          Tweet
        </Button>
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
                isComment={false}
                handleClose={handleClose}
                isModal={true}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default Sidebar;
