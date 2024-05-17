import { Button, Form, Input, Radio, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { getAntdInputValidation } from "../../utils/helpers";

function Login() {
  // State for user type (donar, hospital, or organization)
  const [type, setType] = React.useState("donar");

  // Navigation and dispatch functions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handles form submission
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true)); // Set loading state to true
      const response = await LoginUser({
        ...values, // Spread form values
        userType: type, // Add user type from state
      });
      dispatch(SetLoading(false)); // Set loading state to false
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data); // Store token
        navigate("/"); // Redirect to home on successful login
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  // Check for existing token on component mount and redirect if logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid p-5 gap-5 w-1/3"
        onFinish={onFinish}
      >
        <h1 className="uppercase text-2xl">
          <span className="text-primary">{type.toUpperCase()} - LOGIN</span>
          <hr />
        </h1>

        {/* Radio buttons for user type selection */}
        <Radio.Group onChange={(e) => setType(e.target.value)} value={type}>
          <Radio value="donar">Donar</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>

        {/* Email and password form fields with validation */}
        <Form.Item label="Email" name="email" rules={getAntdInputValidation()}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={getAntdInputValidation()}
        >
          <Input type="password" />
        </Form.Item>

        <Button type="primary" block className="" htmlType="submit">
          Login
        </Button>

        {/* Link to registration page */}
        <Link to="/register" className=" text-center text-gray-700 underline">
          Don't have an account? Register
        </Link>
      </Form>
    </div>
  );
}

export default Login;
