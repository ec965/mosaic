import React from 'react';

const InvisibleCanvas = ({canvasRef, contentWidth, contentHeight}) => {
  return(
    <div>
      <canvas
        style={{
          position: "absolute",
          zIndex: -1,
          height: 0,
          width: 0,
        }}
        width={contentWidth}
        height={contentHeight}
        ref={canvasRef}
      />
    </div>
  );
}
export default InvisibleCanvas;