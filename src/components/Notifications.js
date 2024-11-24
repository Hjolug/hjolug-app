import React, { useContext } from "react";
import { DataContext } from "../App";

const Notifications = () => {
  const data = useContext(DataContext);

  if (!data || data.length === 0) return <div>Loading...</div>; // Adjusted for empty arrays

  return (
    <div className="p-4 bg-white">
      <h2 className="text-lg font-semibold">Senaste händelser</h2>
    </div>
  );
};

export default Notifications;
