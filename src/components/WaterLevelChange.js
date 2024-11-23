import React, { useContext } from "react";
import { DataContext } from "../App";

const WaterLevelChange = () => {
  const data = useContext(DataContext);

  if (!data) return <div>Loading...</div>; // Adjusted to check for null

  const currentChange = data.waterLevelChangeRate; // Access directly since data is an object
  const isIncreasing = currentChange > 0;

  return (
    <div className="flex items-center gap-1.5 text-black">
      <span
        className={` font-medium ${
          isIncreasing
            ? "text-johan-600 text-display-sm"
            : "text-heimo-600 text-xxl"
        }`}
      >
        {isIncreasing ? "⌃" : "⌄"}
      </span>
      <span className="gap-0.5 flex">
        <p className="text-lg font-normal">{Math.abs(currentChange)}</p>
        <span className="text-xs mt-0.5 font-medium">Ø</span>
      </span>
    </div>
  );
};

export default WaterLevelChange;
