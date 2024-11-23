import React, { useContext } from "react";
import { DataContext } from "../App";

const ReservoirContainer = ({ children }) => {
  const data = useContext(DataContext);

  // Handle cases where data is not available
  if (!data) return <div>Loading...</div>;

  // Access the reservoir level from data
  const currentLevel = data.reservoirLevel;

  // Determine background color based on reservoir level
  const backgroundColor =
    currentLevel >= 105 && currentLevel <= 130
      ? "bg-johan-200"
      : "bg-petter-600";

  return (
    <div
      className={`p-4 text-white ${backgroundColor} min-h-screen rounded-2xl`}
    >
      {children}
    </div>
  );
};

export default ReservoirContainer;
