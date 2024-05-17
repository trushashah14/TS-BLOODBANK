import { Button, Form, Input, Radio, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrgHospitalForm from "./OrgHospitalForm";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { getAntdInputValidation } from "../../utils/helpers";

function Register() {
  // State for user type (donar, hospital, organization)
  const [type, setType] = React.useState("donar");
  const navigate = useNavigate(); // Hook for navigation

  const dispatch = useDispatch();

  // Handle form submission
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true)); // Set loading state to true
      const response = await RegisterUser({ ...values, userType: type }); // Register user with type
      if (response.success) {
        message.success(response.message);
        navigate("/login"); // Redirect to login on success
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false)); // Set loading state to false
      message.error(error.message);
    }
  };

  // Check for existing token on component mount and redirect if logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2"
        onFinish={onFinish}
      >
        <h1 className="col-span-2 uppercase text-2xl">
          <span className="text-primary">
            {type.toUpperCase()} - REGISTRATION
          </span>
          <hr />
        </h1>

        {/* Radio group to select user type */}
        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="col-span-2"
        >
          <Radio value="donar">Donar</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>

        {/* Conditionally render form fields based on user type */}
        {type === "donar" && ( // Donar form fields
          <>
            <Form.Item label="Name" name="name" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={getAntdInputValidation()}>
              <Input type="password" />
            </Form.Item>
          </>
        )}

        {type !== "donar" && <OrgHospitalForm type={type} />} {/* Render Org/Hospital form component */}

        <Button type="primary" block className="col-span-2" htmlType="submit">
          Register
        </Button>
        <Link to="/login" className="col-span-2 text-center text-gray-700 underline">
          Already have an account? Login
        </Link>
      </Form>
    </div>
  );
}

export default Register;