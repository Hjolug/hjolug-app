import React, { useContext } from "react";
import { DataContext } from "../App";

const EffectValues = () => {
  const { data, loading, initialLoading } = useContext(DataContext); // Destructure states

  if (initialLoading) return <div>Loading...</div>; // Show only for the first fetch
  if (!data.length) return <div>No data available</div>; // Handle empty data

  const powerGenerator = data[0]?.powerGenerator ?? null; // Safely access the generator value
  const nettoValue =
    data[0] !== null
      ? (data[0].powerExport - data[0].powerImport).toFixed(1)
      : null; // Calculate Netto without conversion

  return (
    <div className="p-4 bg-white flex flex-row space-x-2">
      <div className="">
        <div className="text-display-md font-medium">
          {powerGenerator !== null
            ? `${powerGenerator.toFixed(1)}`
            : "No power value available"}
        </div>
        <div className="text-sm pt-4">Effekt</div>
      </div>
      <div className="">
        <div className="text-display-md font-medium">/</div>
      </div>
      <div className="">
        <div className="text-display-md font-normal flex">
          {nettoValue !== null ? `${nettoValue}` : "No netto value available"}
          <span className="text-xs font-medium tracking-normal pt-2.5 pl-1">
            kW
          </span>
        </div>
        <div className="text-sm pt-4">Netto</div>
      </div>
    </div>
  );
};

export default EffectValues;
