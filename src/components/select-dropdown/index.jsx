import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import CostForm from "../new-cost-form/index";

const CptCodeDropdown = () => {
	const [cptCodes, setCptCodes] = useState([]);
	const [selectedCptCode, setSelectedCptCode] = useState("");
	const [averageCost, setAverageCost] = useState(null);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		// Fetch CPT codes from API
		fetch("http://localhost:3001/api/cptCodes")
			.then((response) => response.json())
			.then((data) => {
				setCptCodes(data);
			})
			.catch((error) => {
				console.error("Error fetching CPT codes:", error);
			});
	}, []);

	const options = [];
	for (let i = 0; i < cptCodes.length; i++) {
		options.push({
			label: cptCodes[i].id,
			value: cptCodes[i].id,
		});
	}

	const handleCptCodeChange = (event) => {
		setSelectedCptCode(event);
		setShowForm(true);
		// Fetch average cost for selected CPT code from API
		fetch(`http://localhost:3001/api/costs/`)
			.then((response) => response.json())
			.then((data) => {
				const filteredData = data.filter((obj) => obj.cptCodeId === event);
				let costs = filteredData.map((obj) => obj.cost);
				const averageCost = costs.reduce((sum, cost) => sum + cost, 0) / filteredData.length;
				setAverageCost(averageCost);
			})
			.catch((error) => {
				console.error("Error fetching average cost:", error);
			});
	};

	return (
		<div>
			<Space
				style={{
					width: "100%",
				}}
				direction="vertical">
				<Select
					style={{
						width: "100%",
					}}
					placeholder="Please select CPT Code"
					defaultValue={""}
					onChange={handleCptCodeChange}
					options={options}
				/>
			</Space>

			{averageCost && (
				<div>
					<p>Average Cost: ${averageCost}</p>
				</div>
			)}
			{showForm && <CostForm selectedCptCode={selectedCptCode} fn={handleCptCodeChange} />}
		</div>
	);
};

export default CptCodeDropdown;
