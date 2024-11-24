import React, { useContext } from "react";
import { DataContext } from "../App";

const Notifications = () => {
  const data = useContext(DataContext);

  if (!data || data.length === 0) return <div>Loading...</div>; // Adjusted for empty arrays

  return (
    <div className="p-4 bg-black text-white w-full rounded-xl text-center mb-4">
      <h2 className="text-md font-medium">Senaste händelser ⌄</h2>
    </div>
  );
};

export default Notifications;
