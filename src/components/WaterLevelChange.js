import React, { useContext } from "react";
import { DataContext } from "../App";

const WaterLevelChange = () => {
  const data = useContext(DataContext);

  if (!data) return <div>Loading...</div>; // Adjusted to check for null

  const currentChange = data.waterLevelChangeRate; // Access directly since data is an object
  const isIncreasing = currentChange > 0;

  return (
    <div className="flex items-center gap-2 text-black">
      <span className={isIncreasing ? "text-green-500" : "text-red-500"}>
        {isIncreasing ? "▲" : "▼"}
      </span>
      <p className="text-lg">{Math.abs(currentChange)}</p>
      <span className="text-xs -mt-2"> Ø</span>
    </div>
  );
};

export default WaterLevelChange;
