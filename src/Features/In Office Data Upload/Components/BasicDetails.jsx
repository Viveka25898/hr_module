/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const BasicDetails = () => {
  const [details, setDetails] = useState({
    name: "",
    fatherName: "",
    spouseName: "",
    address: "",
    localAddress: "",
    nativeAddress: "",
    city: "",
    state: "",
    phone: "",
    aadhar: "",
    pan: "",
    rationCard: null,
    prevEmployer1: "",
    prevEmployer2: "",
    cv: null,
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let newErrors = {};
    Object.keys(details).forEach((key) => {
      if (!details[key] ) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    let newErrors = {};
    
    Object.keys(details).forEach((key) => {
      if (!details[key]) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Saved Data:", details);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Basic Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={details.name}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Father Name</label>
          <input
            type="text"
            name="fatherName"
            value={details.fatherName}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Spouse Name</label>
          <input
            type="text"
            name="spouseName"
            value={details.spouseName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={details.address}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Local Address</label>
          <input
            type="text"
            name="localAddress"
            value={details.localAddress}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Native Address</label>
          <input
            type="text"
            name="nativeAddress"
            value={details.nativeAddress}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={details.city}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">State</label>
          <input
            type="text"
            name="state"
            value={details.state}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={details.phone}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Aadhar Number</label>
          <input
            type="text"
            name="aadhar"
            value={details.aadhar}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">PAN Number</label>
          <input
            type="text"
            name="pan"
            value={details.pan}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Ration Card</label>
          <input
            type="file"
            name="rationCard"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Previous Employer 1</label>
          <input
            type="text"
            name="prevEmployer1"
            value={details.prevEmployer1}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Previous Employer 2</label>
          <input
            type="text"
            name="prevEmployer2"
            value={details.prevEmployer2}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">CV</label>
          <input
            type="file"
            name="cv"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
         {errors["name"] && <p className="text-red-500 text-sm">{errors["name"]}</p>}
        </div>
      </div>

      <button
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default BasicDetails;
