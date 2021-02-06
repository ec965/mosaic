import React from "react";
import { Column } from "../components/layout";
import PixelApp from "./app";

const PixelCard = (props) => {
  return (
    <Column className={`${props.className} card`} onClick={props.onClick}>
      {props.children}
      <Column className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.username}</p>
        <p className="card-text">{props.date}</p>
      </Column>
    </Column>
  );
};

export default PixelCard;
