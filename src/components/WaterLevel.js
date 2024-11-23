import React, { useContext } from "react";
import { DataContext } from "../App";

const WaterLevel = () => {
  const { data, loading, initialLoading } = useContext(DataContext); // Destructure states

  if (initialLoading) return <div>Loading...</div>; // Show only for the first fetch
  if (!data.length) return <div>No data available</div>; // Handle empty data

  const currentLevel = data[0].reservoirLevel; // Use the latest data point

  return (
    <div className="text-black">
      <h2 className="text-md mb-1.5">Dammnivå</h2>
      <div className="flex">
        <p className="text-display-lg font-medium mb-1.5">{currentLevel}</p>
        <span className="text-md ml-2 mt-1.5 tracking-normal font-medium">
          cm
        </span>
      </div>
    </div>
  );
};

export default WaterLevel;
