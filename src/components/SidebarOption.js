import React from "react";
import "./css/sidebarOption.css";

function SidebarOption({ active, text, Icon }) {
  return (
    <div className="sidebar__option">
      <Icon className={`sidebar__icon ${active && `sidebar__active`}`} />
      <span className={active && `sidebar__active`}>{text}</span>
    </div>
  );
}

export default SidebarOption;
