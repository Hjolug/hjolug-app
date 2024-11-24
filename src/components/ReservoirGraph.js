import React, { useContext, useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import { DataContext } from "../App";

const CustomTooltip = ({ active, payload, label, coordinate }) => {
  if (active && payload && payload.length) {
    const reservoirLevel =
      payload.find((item) => item.dataKey === "reservoirLevel")?.value ?? "N/A";
    const energyGenerator =
      payload.find((item) => item.dataKey === "energyGenerator")?.value ??
      "N/A";

    return (
      <div
        className="bg-white shadow-md p-2 rounded text-sm text-black w-36"
        style={{
          position: "absolute",
          top: "10px", // Always at the top of the graph
          left: `${coordinate.x}px`, // Adjust horizontally based on the x-coordinate
          transform: "translateX(-50%)", // Center horizontally
          pointerEvents: "none", // Avoid blocking interactions
        }}
      >
        <p>
          <span className="font-medium">Time:</span> {label}
        </p>
        <p>
          <span className="font-medium">Water:</span> {reservoirLevel} cm
        </p>
        <p>
          <span className="font-medium">Energy:</span> {energyGenerator} kW
        </p>
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
      energyGenerator: (item.energyGenerator / 1000).toFixed(2), // Convert to kW and format to 2 decimal places
    }));
  }, [data]);

  if (!formattedData.length) return <div>No data available</div>;

  return (
    <div className="relative w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 100, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10 }} // Smaller font size for times
            tickLine={false} // No tick lines
            axisLine={false} // No axis line
          />
          <Tooltip
            content={<CustomTooltip />}
            position={{ y: 10 }} // Keeps the tooltip near the top of the graph
            cursor={{
              stroke: "#8EC5CC",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }} // Customizes cursor style
          />
          {/* Energy Generator Line */}
          <Line
            type="monotone"
            dataKey="energyGenerator"
            stroke="#FF5666" // Amber color for contrast
            strokeWidth={2} // Line width set to 2px
            strokeDasharray="5 5"
          />
          {/* Water Level Line */}
          <Line
            type="monotone"
            dataKey="reservoirLevel"
            stroke="#1D8A99" // Heimo-600 color
            strokeWidth={2} // Line width set to 2px
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservoirGraph;
