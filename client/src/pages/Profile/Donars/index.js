import React from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { Table, message } from "antd";
import { GetAllDonarsOfAnOrganization } from "../../../apicalls/users";
import { getDateFormat } from "../../../utils/helpers";

function Donars() {
  // State for donors data
  const [data, setData] = React.useState([]);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Function to fetch donors data
  const getData = async () => {
    try {
      dispatch(SetLoading(true)); // Set loading state to true
      const response = await GetAllDonarsOfAnOrganization();
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

  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text), // Render formatted date
    },
  ];

  // Fetch data on component mount
  React.useEffect(() => {
    getData();
  }, []);

  // Render donors table
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Donars;
