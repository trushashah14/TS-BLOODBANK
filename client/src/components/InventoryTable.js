import React from "react";
import { GetInventoryWithFilters } from "../apicalls/inventory";
import { useDispatch } from "react-redux";
import { getDateFormat } from "../utils/helpers";
import { SetLoading } from "../redux/loadersSlice";
import { Table, message } from "antd";

function InventoryTable({ filters, userType, limit }) {
  // State for inventory data and table open/closed state
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Table columns with formatting for display
  const columns = [
    // Inventory Type, Blood Group, Quantity, Reference, Date columns
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + " ML",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        if (userType === "organization") {
          return record.inventoryType === "in"
            ? record.donar?.name
            : record.hospital?.hospitalName;
        } else {
          return record.organization.organizationName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  // change columns for hospital or donor
  if (userType !== "organization") {
    // remove inventory type column
    columns.splice(0, 1);

    // change reference column to organization name
    columns[2].title = "Organization Name";

    // date column should be renamed taken date
    columns[3].title = userType === "hospital" ? "Taken Date" : "Donated Date";
  }

  // Fetch inventory data with filters and handle loading/errors
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventoryWithFilters(filters, limit);
      dispatch(SetLoading(false));
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
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} className="mt-3" />
    </div>
  );
}

export default InventoryTable;