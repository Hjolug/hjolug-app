import React, { useContext } from "react";
import { DataContext } from "../App";

const WaterLevel = () => {
  const data = useContext(DataContext);

  if (!data) return <div>Loading...</div>; // Adjusted to check for null or undefined

  const currentLevel = data.reservoirLevel; // Access reservoirLevel directly

  return (
    <div className="text-black">
      <h2 className="text-md mb-1.5">Dammnivå</h2>
      <p className="text-display-lg font-medium mb-1.5">{currentLevel}</p>
    </div>
  );
};

export default WaterLevel;
