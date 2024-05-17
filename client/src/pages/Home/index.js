import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBloodBroupsInInventory } from "../../apicalls/dashboard";
import { SetLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import InventoryTable from "../../components/InventoryTable";

function Home() {
  // Access current user data from Redux store
  const { currentUser } = useSelector((state) => state.users);

  // State for blood group inventory data
  const [bloodGroupsData, setBloodGroupsData] = useState([]);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Function to fetch blood group inventory data
  const getData = async () => {
    try {
      dispatch(SetLoading(true)); // Set loading state to true
      const response = await GetAllBloodBroupsInInventory();
      dispatch(SetLoading(false)); // Set loading state to false
      if (response.success) {
        setBloodGroupsData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Define colors for blood group cards (optional)
  const colours = [
    "#2B3467",
    "#1A5F7A",
    "#B8621B",
    "#245953",
    "#2C3333",
    "#804674",
    "#A84448",
    "#635985",
  ];

  // Render content based on user type
  return (
    <div>
      {currentUser.userType === "organization" && (
        <>
          {/* Blood Group Inventory Summary for Organizations */}
          <div className="grid grid-cols-4 gap-5 mb-5 mt-2">
          {bloodGroupsData.map((bloodGroup, index) => {
              const color = colours[index];
              return (
                <div
                  className={`p-5 flex justify-between text-white rounded items-center`}
                  style={{ backgroundColor: color }}
                >
                  <h1 className="text-5xl uppercase">
                    {bloodGroup.bloodGroup}
                  </h1>

                  <div className="flex flex-col justify-between gap-2">
                    <div className="flex justify-between gap-5">
                      <span>Total In</span>
                      <span>{bloodGroup.totalIn} ML</span>
                    </div>
                    <div className="flex justify-between gap-5">
                      <span>Total Out</span>
                      <span>{bloodGroup.totalOut} ML</span>
                    </div>

                    <div className="flex justify-between 5">
                      <span>Available</span>
                      <span>{bloodGroup.available} ML</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Inventory for Organizations */}
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Inventory
          </span>
          <InventoryTable
            filters={{
              organization: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </>
      )}

      {currentUser.userType === "donar" && (
        <div>
          {/* Recent Donations for Donors */}
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Donations
          </span>
          <InventoryTable
            filters={{
              donar: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </div>
      )}

      {currentUser.userType === "hospital" && (
        <div>
          {/* Recent Requests/Consumptions for Hospitals */}
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Requests / Consumptions
          </span>
          <InventoryTable
            filters={{
              hospital: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
