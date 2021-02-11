import React from "react";
import { Button } from "./button";

export const RandomButton = ({ onClick }) => (
  <Button onClick={onClick} className="courier">
    Random <i className="fas fa-dice-d20"></i>
  </Button>
);
export const ResetButton = ({ onClick }) => (
  <Button onClick={onClick} className="courier red">
    Reset <i className="fas fa-redo"></i>
  </Button>
);
