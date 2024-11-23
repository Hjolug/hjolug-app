import React, { useState, useEffect, createContext } from "react";
import Layout from "./components/Layout";

export const DataContext = createContext();

const App = () => {
  const [data, setData] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(true); // Track ongoing fetch status
  const [initialLoading, setInitialLoading] = useState(true); // Track first fetch only

  useEffect(() => {
    const fetchData = () => {
      setLoading(true); // Set loading to true before each fetch
      fetch("https://6720616ae7a5792f05314e7c.mockapi.io/Herrekvarn")
        .then((response) => response.json())
        .then((fetchedData) => {
          setData(fetchedData);
          setLoading(false); // Data fetched, ongoing loading ends
          setInitialLoading(false); // First fetch is complete
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // Even on error, stop ongoing loading
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch every second

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <DataContext.Provider
      value={{
        data: Array.isArray(data) ? data : [], // Ensure data is always an array
        loading,
        initialLoading,
      }}
    >
      <Layout />
    </DataContext.Provider>
  );
};

export default App;
