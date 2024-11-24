import React, { useContext, useMemo, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import { DataContext } from "../App";

const CustomTooltip = ({ active, payload, label, coordinate }) => {
  if (active && payload && payload.length) {
    const reservoirLevel =
      payload.find((item) => item.dataKey === "reservoirLevel")?.value ?? "N/A";
    const powerGenerator =
      payload.find((item) => item.dataKey === "powerGenerator")?.value ?? "N/A";

    return (
      <div
        className="bg-white shadow-md p-2 rounded text-sm text-black w-40"
        style={{
          position: "absolute",
          top: "10px",
          left: `${coordinate.x}px`,
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      >
        <div className="space-x-2 flex flex-row">
          <span className="font-medium text-lg flex">
            {reservoirLevel}
            <span className="font-medium text-xxs pl-1"> cm</span>
          </span>

          <span className="font-medium text-lg">/</span>
          <span className="font-medium  text-lg flex">
            {powerGenerator}
            <span className="font-medium text-xxs pl-1"> kW</span>
          </span>
        </div>

        {label}
      </div>
    );
  }

  return null;
};

const ReservoirGraph = () => {
  const { data } = useContext(DataContext);

  const [timeRange, setTimeRange] = useState(8); // Default to the last 8 hours

  const now = Math.floor(Date.now() / 1000); // Current time in seconds since epoch

  const formattedData = useMemo(() => {
    console.log("Raw Data:", data); // Debug raw data
    if (!Array.isArray(data) || data.length === 0) return [];

    const cutoffTime = now - timeRange * 60 * 60; // Calculate cutoff timestamp
    console.log("Cutoff Time:", cutoffTime); // Debug cutoff time

    const filteredData = data.filter((item) => item.timestampUTC >= cutoffTime);
    console.log("Filtered Data:", filteredData); // Debug filtered data

    const dataset = filteredData.length > 0 ? filteredData : data;

    return dataset.map((item) => ({
      time: new Date(item.timestampUTC * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reservoirLevel: item.reservoirLevel,
      powerGenerator: item.powerGenerator,
    }));
  }, [data, timeRange, now]);

  const interval = useMemo(() => {
    return Math.ceil(formattedData.length / 6); // Display approximately 6 labels
  }, [formattedData]);

  if (!formattedData.length) return <div>No data available</div>;

  return (
    <div className="relative w-full h-96">
      {/* Dropdown for selecting time range */}
      <div className="absolute bottom-1 right-2 z-10 bg-transparent">
        <select
          className="border border-gray-300 rounded px-1 py-1 text-sm text-black"
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
        >
          <option value={8}>8h</option>
          <option value={24}>24h</option>
          <option value={48}>48h</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 100, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval={interval} // Dynamically calculated interval
          />
          <Tooltip
            content={<CustomTooltip />}
            position={{ y: 10 }}
            cursor={{
              stroke: "#8EC5CC",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }}
          />
          <Line
            type="monotone"
            dataKey="reservoirLevel"
            stroke="#1D8A99"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="powerGenerator"
            stroke="#FF5666"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservoirGraph;
