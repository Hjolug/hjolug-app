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
        className="bg-white shadow-sm px-2 py-1 items-center rounded-full text-sm text-black w-36 justify-center"
        style={{
          position: "absolute",
          top: "30px",
          left: `${coordinate.x}px`,
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      >
        <div className="space-x-1 flex flex-row justify-center items-center">
          <span className="text-lg flex">
            {reservoirLevel}
            <span className="font-medium text-xxs pl-0.5"> cm</span>
          </span>
          <span className="text-lg">/</span>
          <span className="text-lg flex">
            {powerGenerator}
            <span className="font-medium text-xxs pl-0.5"> kW</span>
          </span>
        </div>
        <div className="justify-center text-center text-xxs pr-2">{label}</div>
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
    if (!Array.isArray(data) || data.length === 0) return [];

    const cutoffTime = now - timeRange * 60 * 60; // Calculate cutoff timestamp

    const filteredData = data.filter((item) => item.timestampUTC >= cutoffTime);

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

  const customTickFormatter = (value, index) => {
    // Hide the last two labels
    if (index >= formattedData.length - 2) return ""; // Avoid the last two labels
    return value;
  };

  if (!formattedData.length) return <div>No data available</div>;

  return (
    <div className="relative w-full h-96">
      {/* Dropdown for selecting time range */}
      <div className="absolute bottom-1.5 right-3 z-10 bg-transparent">
        <select
          className="rounded-lg px-2 py-1 text-sm text-black font-medium"
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
          margin={{ top: 80, right: 0, left: 0, bottom: 12 }}
        >
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            interval={interval} // Dynamically calculated interval
            tickFormatter={(value, index) =>
              index < formattedData.length - 2 ? value : ""
            } // Hide the last two labels
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
