import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { getAntdInputValidation } from "../../utils/helpers";

function OrgHospitalForm({ type }) {
  // Render form fields based on the provided type (hospital or organization)
  return (
    <>
      <Form.Item
        label={type === "hospital" ? "Hospital Name" : "Organization Name"} // Dynamic label based on type
        name={type === "hospital" ? "hospitalName" : "organizationName"} // Dynamic field name based on type
        rules={getAntdInputValidation()} // Set validation rules from helper function
      >
        <Input />
      </Form.Item>
      <Form.Item name="owner" label="Owner" rules={getAntdInputValidation()}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={getAntdInputValidation()}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={getAntdInputValidation()}>
        <Input />
      </Form.Item>
      <Form.Item
        name="website"
        label="Website"
        rules={getAntdInputValidation()}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={getAntdInputValidation()}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        className="col-span-2" // Set grid layout for address field
        rules={getAntdInputValidation()}
      >
        <TextArea />
      </Form.Item>
    </>
  );
}

export default OrgHospitalForm;
