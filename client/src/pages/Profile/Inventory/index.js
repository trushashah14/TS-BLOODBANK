import React, { useState, useEffect } from "react";
import InventoryForm from "./InventoryForm"; // Import for adding inventory form
import { Button, Table, message } from "antd"; // Import Ant Design components
import { useDispatch } from "react-redux"; // Dispatch function for Redux actions
import { GetInventory } from "../../../apicalls/inventory"; // API call for fetching inventory
import { SetLoading } from "../../../redux/loadersSlice"; // Action for setting loading state
import { getDateFormat } from "../../../utils/helpers"; // Utility function for formatting date

function Inventory() {
  // State for inventory data
  const [data, setData] = useState([]);

  // State for modal visibility (adding inventory)
  const [open, setOpen] = useState(false);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Define table columns with render functions for custom formatting
  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(), // Render inventory type in uppercase
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(), // Render blood group in uppercase
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + " ML", // Render quantity with unit
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        // Render reference based on inventory type ("in" or "out")
        if (record.inventoryType === "in") {
          return record.donar.name;
        } else {
          return record.hospital.hospitalName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text), // Render formatted date using utility function
    },
  ];

  // Function to fetch inventory data
  const getData = async () => {
    try {
      dispatch(SetLoading(true)); // Set loading state to true
      const response = await GetInventory();
      dispatch(SetLoading(false)); // Set loading state to false
      if (response.success) {
        setData(response.data);
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

  return (
    <div>
      {/* Button to open Add Inventory form */}
      <div className="flex justify-end">
        <Button type="default" onClick={() => setOpen(true)}>
          Add Inventory
        </Button>
      </div>

      {/* Inventory table displaying fetched data */}
      <Table columns={columns} dataSource={data} className="mt-3" />

      {/* Conditionally render InventoryForm component */}
      {open && (
        <InventoryForm
          open={open} // Pass open state to InventoryForm
          setOpen={setOpen} // Pass setOpen function to InventoryForm

          // Function to reload data after form submission
          reloadData={getData}
        />
      )}
    </div>
  );
}

export default Inventory;
