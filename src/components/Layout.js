import React from "react";
import ReservoirContainer from "./ReservoirContainer";
import ReservoirIndicator from "./ReservoirIndicator";
import EffectValues from "./EffectValues"; // Placeholder for future global values
import Notifications from "./Notifications"; // Placeholder for notifications
import WaterLevelChange from "./WaterLevelChange";
import Header from "./Header";
import WaterLevel from "./WaterLevel";
import ReservoirGraph from "./ReservoirGraph";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col px-4 overflow-x-hidden w-full">
      {/* Global elements outside ReservoirContainer */}
      <Header />

      <main className="flex-grow">
        <ReservoirContainer>
          <div className="flex justify-between px-4">
            <div>
              <WaterLevel />
              <WaterLevelChange />
            </div>
            <ReservoirIndicator />
          </div>
          <ReservoirGraph />
        </ReservoirContainer>

        <EffectValues />
        <Notifications />
      </main>
    </div>
  );
};

export default Layout;
