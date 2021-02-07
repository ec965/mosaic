import React from "react";
import { Column } from "../components/layout";
import PixelApp from "./app";
import { dateString } from "../util/util";

const Card = (props) => {
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

const PixelCard = ({
  title,
  username,
  date,
  maxWidth,
  project: { pixelMap, borderRadius, backgroundColor, grid },
}) => {
  const longer = Math.max(pixelMap[0].length, pixelMap.length);
  return (
    <Card title={title} username={username} date={dateString(date)}>
      <PixelApp
        pixelMap={pixelMap}
        pixelSize={
          grid 
          ? maxWidth / longer - 2 
          : maxWidth / longer
        }
        borderRadius={borderRadius}
        grid={grid}
        backgroundColor={backgroundColor}
      />
    </Card>
  );
};

export default PixelCard;
