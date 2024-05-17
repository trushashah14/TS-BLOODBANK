import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import Donars from "./Donars";
import Hospitals from "./Hospitals";
import Organizations from "./Organizations";
import InventoryTable from "../../components/InventoryTable";

function Profile() {
  // Access current user data from Redux store
  const { currentUser } = useSelector((state) => state.users);

  return (
    <div>
      <Tabs>
        {/* Conditionally render tabs based on user type */}
        {currentUser.userType === "organization" && (
          <>
            <Tabs.TabPane tab="Inventory" key="1">
              <Inventory /> {/* Render Inventory component */}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Donars" key="2">
              <Donars /> {/* Render Donars component */}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hospitals" key="3">
              <Hospitals /> {/* Render Hospitals component */}
            </Tabs.TabPane>
          </>
        )}

        {currentUser.userType === "donar" && (
          <>
            <Tabs.TabPane tab="Donations" key="4">
              {/* Render InventoryTable with filters */}
              <InventoryTable
                filters={{
                  inventoryType: "in", // Filter for incoming inventory
                  donar: currentUser._id, // Filter for donar's donations
                }}
                userType="donar" // Pass userType for specific views
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Organizations" key="5">
              <Organizations userType="donar" />{" "}
              {/* Render Organizations with userType */}
            </Tabs.TabPane>
          </>
        )}

        {currentUser.userType === "hospital" && (
          <>
            <Tabs.TabPane tab="Consumptions" key="6">
              {/* Render InventoryTable with filters */}
              <InventoryTable
                filters={{
                  inventoryType: "out", // Filter for outgoing inventory
                  hospital: currentUser._id, // Filter for hospital's consumptions
                }}
                userType="hospital" // Pass userType for specific views
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Organizations" key="7">
              <Organizations userType="hospital" />{" "}
              {/* Render Organizations with userType */}
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
