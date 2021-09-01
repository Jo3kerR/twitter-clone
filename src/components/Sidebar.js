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

function Sidebar() {
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <SidebarOption active text="Home" Icon={HomeIcon} />
      <SidebarOption text="Explore" Icon={SearchOutlinedIcon} />
      <SidebarOption text="Notifications" Icon={NotificationsOutlinedIcon} />
      <SidebarOption text="Messages" Icon={MailOutlineIcon} />
      <SidebarOption text="Bookmarks" Icon={BookmarkBorderOutlinedIcon} />
      <SidebarOption text="Lists" Icon={ListAltOutlinedIcon} />
      <SidebarOption text="Profile" Icon={PersonOutlineOutlinedIcon} />
      <SidebarOption text="More" Icon={MoreHorizOutlinedIcon} />
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
