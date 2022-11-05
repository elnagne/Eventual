import React from "react";
import NotifCard from "./NotificationsCard";

const NotificationsDisplay = (props) => {
  return (
    <div>
      {props.events.map((event) => { return <NotifCard event={event} /> })}
    </div>
  );
};

export default NotificationsDisplay;
