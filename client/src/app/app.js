import React from "react";
import { Row, Column } from "../components/layout";

// parameters to tweak
// border radius
// RGB min and max
// sort length
// sort direction
// sort based on hue, saturation, or lightness
// pixel dims

// props.pixel = Pixel();
const PixelDiv = (props) => {
  const style = {
    backgroundColor: `rgb(${props.pixel.r}, ${props.pixel.g}, ${props.pixel.b}`,
    // backgroundColor: props.pixel.hex,
    height: `${props.pixelSize}px`,
    width: `${props.pixelSize}px`,
    borderRadius: `${props.borderRadius}%`,
    border: props.grid ? `solid 1px ${props.backgroundColor}` : null,
  };

  return <div style={style}></div>;
};

export const PixelApp = ({
  pixelMap,
  pixelSize,
  borderRadius,
  grid,
  backgroundColor,
}) => {
  // const width = pixelMap[0].length;
  // const height = pixelMap.length;

  const render = pixelMap.map((inner, i) => {
    return (
      <Row key={i} style={{ backgroundColor: `${backgroundColor}` }}>
        {inner.map((p, j) => (
          <PixelDiv
            grid={grid}
            key={j}
            pixel={p}
            pixelSize={pixelSize}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
          />
        ))}
      </Row>
    );
  });

  return <Column>{render}</Column>;
};

PixelApp.defaultProps = {
  pixelMap: [[{ r: 1, g: 1, b: 1 }]],
  pixelSize: 30,
  borderRadius: 0,
  grid: false,
  backgroundColor: "#AAA",
};

export default PixelApp;
