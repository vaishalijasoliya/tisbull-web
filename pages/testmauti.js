import { Typography } from "@material-ui/core";
import React, { useState } from "react";

export default function App() {
  const arr = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      {arr.map((element, index) => {
        if (element+1 == 2) {
          return <h2 key={index}>{element}</h2>;
        }

        return <h2 key={index}>X</h2>;
      })}
    </div>
  );
}