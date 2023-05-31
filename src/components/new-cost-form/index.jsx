import React from "react";
import { Button, Form, Input } from "antd";
import PropTypes from "prop-types";

const CostForm = ({ selectedCptCode }) => {
	const handleFormSubmit = (values) => {
		const { cost, facilityType, copay } = values;
		// event.preventDefault();
		console.log(values);

		// Perform API request to post the new cost
		fetch(`http://localhost:3001/api/cptCodes/${selectedCptCode}/costs`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cost: parseFloat(cost),
				facilityType,
				copay: parseFloat(copay),
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("New cost posted:", data);
			})
			.catch((error) => {
				// Handle error
				console.error("Error posting new cost:", error);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Form
			onFinish={handleFormSubmit}
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			style={{
				maxWidth: 600,
			}}
			initialValues={{
				remember: true,
			}}
			onFinishFailed={onFinishFailed}
			autoComplete="off">
			<Form.Item
				label="Cost"
				name="cost"
				rules={[
					{
						required: true,
						message: "Please input the cost!",
					},
				]}>
				<Input />
			</Form.Item>

			<Form.Item
				label="Facility Type"
				name="facilityType"
				rules={[
					{
						required: true,
						message: "Please input the facility type!",
					},
				]}>
				<Input />
			</Form.Item>

			<Form.Item
				label="CoPay"
				name="copay"
				rules={[
					{
						required: true,
						message: "Please input the copay!",
					},
				]}>
				<Input />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}>
				<Button type="primary" htmlType="submit">
					Add New Cost
				</Button>
			</Form.Item>
		</Form>
	);
};

CostForm.propTypes = {
	selectedCptCode: PropTypes.number.isRequired,
};

export default CostForm;
