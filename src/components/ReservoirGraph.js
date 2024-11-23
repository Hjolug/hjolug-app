import React, { useContext, useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import { DataContext } from "../App";

const ReservoirGraph = () => {
  const { data } = useContext(DataContext);

  console.log("Data from context:", data); // Debugging log

  const formattedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    return data.map((item) => ({
      time: new Date(item.timestampUTC * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reservoirLevel: item.reservoirLevel,
    }));
  }, [data]);

  if (!formattedData.length) return <div>No data available</div>;

  return (
    <div className="relative w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <XAxis dataKey="time" />
          <Tooltip />
          <Line type="monotone" dataKey="reservoirLevel" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservoirGraph;
