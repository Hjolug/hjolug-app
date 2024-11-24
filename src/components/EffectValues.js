import React, { useContext } from "react";
import { DataContext } from "../App";

const EffectValues = () => {
  const { data, loading, initialLoading } = useContext(DataContext); // Destructure states

  if (initialLoading) return <div>Loading...</div>; // Show only for the first fetch
  if (!data.length) return <div>No data available</div>; // Handle empty data

  const effectValueInWatts = data[0]?.energyGenerator ?? null; // Safely access the value
  const effectValueInKilowatts =
    effectValueInWatts !== null ? (effectValueInWatts / 1000).toFixed(2) : null;

  return (
    <div className="p-4 bg-white flex flex-col">
      <div className="text-display-md font-medium">
        {effectValueInKilowatts !== null
          ? `${effectValueInKilowatts}`
          : "No effect value available"}
      </div>
      <div className="text-sm pt-4">Effekt</div>
      <div className="text-display-md font-medium"></div>
      <div className="text-sm pt-4">Netto</div>
    </div>
  );
};

export default EffectValues;
