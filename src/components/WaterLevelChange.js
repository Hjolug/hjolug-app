import React, { useContext } from "react";
import { DataContext } from "../App";

const WaterLevelChange = () => {
  const { data, loading, initialLoading } = useContext(DataContext);

  if (initialLoading) return <div>Loading...</div>; // Show only during the first fetch
  if (!data.length) return <div>No data available</div>; // Handle empty data

  const currentChange = data[0].waterLevelChangeRate; // Use the latest data point
  const isIncreasing = currentChange > 0;

  return (
    <div className="flex items-center gap-1.5 text-black">
      <span
        className={`font-medium ${
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
