import React, { useContext } from "react";
import { DataContext } from "../App";

const EffectValues = () => {
  const data = useContext(DataContext);

  if (!data) return <div>Loading...</div>; // Handle null or undefined data

  const effectValue = data.energyGenerator || "N/A"; // Add fallback value

  return (
    <div className="p-4 bg-white shadow-md">
      <h2 className="text-lg font-semibold">Effect Value</h2>
      <p>{effectValue}</p>
    </div>
  );
};

export default EffectValues;
