import React from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { Table, message } from "antd";
import { GetAllHospitalsOfAnOrganization } from "../../../apicalls/users";
import { getDateFormat } from "../../../utils/helpers";

function Hospitals() { 
  // State for hospitals data
  const [data, setData] = React.useState([]);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Function to fetch hospitals data
  const getData = async () => {
    try {
      dispatch(SetLoading(true)); // Set loading state to true
      const response = await GetAllHospitalsOfAnOrganization();
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
      title: "Hospital Name",
      dataIndex: "hospitalName",
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
      title: "Address",
      dataIndex: "address",
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

  // Render hospitals table
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Hospitals;
