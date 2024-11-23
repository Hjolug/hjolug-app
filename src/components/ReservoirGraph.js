import React, { useContext, useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import { DataContext } from "../App";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white shadow-md p-2 rounded text-sm text-black"
        style={{
          position: "relative",
          top: "-50px", // Adjust the tooltip to appear higher
        }}
      >
        <p className="font-medium">Time: {label}</p>
        <p>Reservoir Level: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

const ReservoirGraph = () => {
  const { data } = useContext(DataContext);

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
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="time" />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="reservoirLevel" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservoirGraph;
