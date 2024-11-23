import React, { useContext } from "react";
import { DataContext } from "../App";

const ReservoirIndicator = () => {
  const { data, loading, initialLoading } = useContext(DataContext); // Access both states

  if (initialLoading) return <div>Loading...</div>; // Show only for the first fetch
  if (!data.length) return <div>No data available</div>; // Handle empty data

  const {
    reservoirLevelBool1,
    reservoirLevelBool2,
    reservoirLevelBool3,
    reservoirLevelBool4,
  } = data[0]; // Use the latest data point

  const getIndicatorStyles = (isActive) =>
    isActive
      ? "bg-johan-600 text-white border-johan-600"
      : "bg-transparent text-gray-500 border-black/40";

  return (
    <div className="flex space-y-1.5 flex-col">
      <span
        className={`flex leading-5 items-center text-xs justify-center w-5 h-5 rounded-full border font-medium ${getIndicatorStyles(
          reservoirLevelBool1
        )}`}
      >
        1
      </span>
      <span
        className={`flex leading-5 items-center text-xs justify-center w-5 h-5 rounded-full border font-medium ${getIndicatorStyles(
          reservoirLevelBool2
        )}`}
      >
        2
      </span>
      <span
        className={`flex leading-5 items-center text-xs justify-center w-5 h-5 rounded-full border font-medium ${getIndicatorStyles(
          reservoirLevelBool3
        )}`}
      >
        3
      </span>
      <span
        className={`flex leading-5 items-center text-xs justify-center w-5 h-5 rounded-full border font-medium ${getIndicatorStyles(
          reservoirLevelBool4
        )}`}
      >
        4
      </span>
    </div>
  );
};

export default ReservoirIndicator;
