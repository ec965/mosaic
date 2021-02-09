import React, { useEffect, useState } from "react";
import { Page, Row, Column } from "../components/layout";
import { Link } from "react-router-dom";
import PixelApp from "../app/app";
import { randInt } from "../util/util";
import { RandomPixelSquare } from "../app/generator";

const LandingPage = (props) => {
  const [pixelMap, setPixelMap] = useState([[{ r: 1, b: 1, g: 1 }]]);
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    let data = new RandomPixelSquare(4, 0, 255, 0, 255, 0, 255);
    data.sortHue();
    setPixelMap(data.data);
    setGrid(randInt(0, 1));
  }, []);

  return (
    <Page>
      <Column className="center">
        <div>
          <Link to="/login">
            <h3 className="courier landing-text">Login</h3>
          </Link>
        </div>
        <Row>
          <a href="https://enochchau.com/#Moasic">
            <h3 className="courier landing-text vertical-text flip">About</h3>
          </a>
          <PixelApp
            pixelMap={pixelMap}
            borderRadius={randInt(0, 50)}
            grid={grid}
            // backgroundColor={`rgb(${randInt(0,255)}, ${randInt(0,255)}, ${randInt(0,255)}`}
            pixelSize={grid ? 360 / pixelMap.length - 2 : 360 / pixelMap.length}
          />
          <a href="https://github.com/ec965/user-land">
            <h3 className="courier landing-text vertical-text">GitHub</h3>
          </a>
        </Row>
        <div>
          <Link to="/register">
            <h3 className="courier landing-text">Register</h3>
          </Link>
        </div>
      </Column>
    </Page>
  );
};

export default LandingPage;
