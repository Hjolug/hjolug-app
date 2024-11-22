import React, { useState, useEffect, createContext } from "react";
import Layout from "./components/Layout";

export const DataContext = createContext();

const App = () => {
  const [data, setData] = useState([]);
  const [randomData, setRandomData] = useState({
    reservoirLevel: 0,
    reservoirLevelBool1: false,
    reservoirLevelBool2: false,
    reservoirLevelBool3: false,
    reservoirLevelBool4: false,
  });

  useEffect(() => {
    console.log("Starting data fetch interval...");

    const fetchData = () => {
      console.log("Fetching data...");
      fetch("https://6720616ae7a5792f05314e7c.mockapi.io/Herrekvarn")
        .then((response) => response.json())
        .then((fetchedData) => {
          console.log("Fetched Data:", fetchedData); // Log the fetched data
          setData(fetchedData);

          // Randomly pick a new item
          const newRandomData = getRandomItem(fetchedData);
          console.log("Random Data Updated:", newRandomData);
          setRandomData(newRandomData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    // Fetch data every second
    const interval = setInterval(fetchData, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const getRandomItem = (array) => {
    console.log("Selecting random item from array:", array); // Log the array before picking
    return array.length > 0
      ? array[Math.floor(Math.random() * array.length)]
      : null;
  };

  console.log("Current Random Data:", randomData); // Log the current randomData during each render

  return (
    <DataContext.Provider value={randomData}>
      <Layout />
    </DataContext.Provider>
  );
};

export default App;
