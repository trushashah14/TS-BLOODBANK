import { Form, Input, Modal, Radio, message } from "antd";
import React, { useState } from "react";
import { getAntdInputValidation } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { AddInventory } from "../../../apicalls/inventory";

function InventoryForm({ open, setOpen, reloadData }) {
  // Access current user data from Redux store
  const { currentUser } = useSelector((state) => state.users);

  // Initialize form instance
  const [form] = Form.useForm();

  // State for inventory type (in/out)
  const [inventoryType, setInventoryType] = useState("in");

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Function to handle form submission
  const onFinish = async (values) => {
    console.log(values); // For debugging purposes (can be removed)
    try {
      dispatch(SetLoading(true)); // Set loading state to true
      const response = await AddInventory({
        ...values, // Spread form values
        inventoryType, // Add inventory type from state
        organization: currentUser._id, // Add organization ID from current user
      });
      dispatch(SetLoading(false)); // Set loading state to false
      if (response.success) {
        reloadData(); // Call function to reload inventory data
        message.success("Inventory Added Successfully");
        setOpen(false); // Close the modal
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  return (
    <Modal
      title="ADD INVENTORY"
      open={open}
      onCancel={() => setOpen(false)} // Close modal on cancel
      centered // Center the modal
      onOk={() => {
        form.submit(); // Submit form on OK button click
      }}
    >
      <Form
        layout="vertical"
        className="flex flex-col gap-3" // Set form layout and styling
        form={form}
        onFinish={onFinish} // Call onFinish function on form submission
      >
        <Form.Item label="Inventory Type">
          <Radio.Group // Radio group for selecting inventory type
            value={inventoryType} // Set initial value from state
            onChange={(e) => setInventoryType(e.target.value)} // Update state on change
          >
            <Radio value="in">In</Radio>
            <Radio value="out">Out</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Blood Group"
          name="bloodGroup"
          rules={getAntdInputValidation()} // Set validation rules for blood group
        >
          <select name="" id="">
            <option value="a+">A+</option>
            <option value="a-">A-</option>
            <option value="b+">B+</option>
            <option value="b-">B-</option>
            <option value="o+">O+</option>
            <option value="o-">O-</option>
            <option value="ab+">AB+</option>
            <option value="ab-">AB-</option>
          </select>
        </Form.Item>

        <Form.Item // Dynamic label based on inventory type
          label={inventoryType === "out" ? "Hospital Email" : "Donar Email"}
          name="email"
          rules={getAntdInputValidation()} // Set validation rules for email
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Quantity (ML)" name="quantity" rules={getAntdInputValidation()}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default InventoryForm;
