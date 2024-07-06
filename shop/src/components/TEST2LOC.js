import React from "react";
import { useState } from "react";

const ShopReg = ({ handleClose }) => {
	const [inputs, setInputs] = useState({
		s_name: "",
		s_phone: "",
		s_password: "",
		s_div: "",
		s_dist: "",
		s_subdist: "",
		s_union: "",
		s_road: "",
		s_location: "",
	});

	const {
		s_name,
		s_phone,
		s_password,
		s_div,
		s_dist,
		s_subdist,
		s_union,
		s_road,
		s_location,
	} = inputs;
	console.log("From front-end: ", inputs);
	const onChange = (e) =>
		setInputs({ ...inputs, [e.target.name]: e.target.value });

	const handleRegistrationSubmit = async (e) => {
		e.preventDefault();
		try {
			// Validate form data
			// if (!s_name || !s_phone || !s_password || !s_div || !s_dist || !s_subdist || !s_union || !s_road) {
			//     console.error("Please fill all the required fields");
			//     return;
			// }

			const response = await fetch(
				"http://localhost:5000/auth/shop-register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						s_name,
						s_phone,
						s_password,
						s_div,
						s_dist,
						s_subdist,
						s_union,
						s_road,
						s_location,
					}),
				}
			);

			const data = await response.json();
            console.log("Data : ",data);

			if (response.ok) {
				console.log("Registration successful:", data);
				handleClose(); // Close the registration form modal
			} else {
				console.error("Registration failed:", data);
			}
		} catch (error) {
			console.error("Error registering shop:", error.message);
		}
	};

	return (
		<div className="container mt-4">
			<h2 className="mb-4">Shop Registration</h2>
			<form onSubmit={handleRegistrationSubmit}>
				<div className="mb-3">
					<label htmlFor="s_name" className="form-label">
						Shop Name
					</label>
					<input
						type="text"
						className="form-control"
						id="s_name"
						name="s_name"
						placeholder="Enter shop name"
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="s_phone" className="form-label">
						Phone Number
					</label>
					<input
						type="tel"
						className="form-control"
						id="s_phone"
						name="s_phone"
						placeholder="Enter phone number"
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="s_password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="s_password"
						name="s_password"
						placeholder="Password"
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="row mb-3">
					<div className="col-md-4">
						<label htmlFor="s_division" className="form-label">
							Division
						</label>
						<input
							type="text"
							className="form-control"
							id="s_div"
							name="s_div"
							placeholder="Enter division"
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="s_district" className="form-label">
							District
						</label>
						<input
							type="text"
							className="form-control"
							id="s_dist"
							name="s_dist"
							placeholder="Enter district"
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="col-md-4">
						<label htmlFor="s_subdist" className="form-label">
							Sub-District
						</label>
						<input
							type="text"
							className="form-control"
							id="s_subdist"
							name="s_subdist"
							placeholder="Enter sub-district"
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
				</div>
				<div className="row mb-3">
					<div className="col-md-6">
						<label htmlFor="s_union" className="form-label">
							Union/City-Corporation
						</label>
						<input
							type="text"
							className="form-control"
							id="s_union"
							name="s_union"
							placeholder="Enter union/city-corporation"
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="s_road" className="form-label">
							Road
						</label>
						<input
							type="text"
							className="form-control"
							id="s_road"
							name="s_road"
							placeholder="Road/Thana"
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="s_location" className="form-label">
						Google Map Location
					</label>
					<input
						type="text"
						className="form-control"
						id="s_location"
						name="s_location"
						placeholder="Enter map location"
						onChange={(e) => onChange(e)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Register
				</button>
				<button
					type="button"
					className="btn btn-secondary ms-2"
					onClick={handleClose}
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default ShopReg;