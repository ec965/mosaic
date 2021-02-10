import React from "react";
import PixelApp from "./app";
import { dateString } from "../util/util";
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <div className='card' onClick={props.onClick}>
      <div className="card-child">
        {props.children}
      </div>
      <div className="card-body">
        <Link to={props.link}>
          <h5 className="card-title">{props.title}</h5>
        </Link>
        <Link to={`/profile/${props.username}`}>
          <h6 className="card-text link">{props.username}</h6>
        </Link>
        <p className="card-text">{props.date}</p>
        {props.body}
      </div>
    </div>
  );
};

const PixelCard = ({
  title,
  username,
  date,
  maxWidth,
  body,
  project: { pixelMap, borderRadius, backgroundColor, grid },
  link
}) => {
  const longer = Math.max(pixelMap[0].length, pixelMap.length);
  return (
    <div className="profile-card">
      <div className="card-wrapper">
        <Card title={title} username={username} date={dateString(date)} body={body} link={link} >
          <Link to={link}>
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
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default PixelCard;
