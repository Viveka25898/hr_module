/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";

const BasicDetails = ({onNext}) => {
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


  const [isBlacklisted,setIsBlacklisted]=useState(false)
  const [showModal,setShowModal]=useState(false)
  const [currentStep, setCurrentStep] = useState(1);


  //This Dummy data is For Functionality Checking
  const blacklistedStaff=[
    { aadhar: "123456789012", pan: "ABCDE1234F", name: "Ajay Sharma" },
  ]

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


  //Save Function
  const handleSave = () => {
    //Error
    let newErrors = {};
    Object.keys(details).forEach((key) => {
      if (!details[key]) {
        newErrors[key] = "This field is required";
      }
    });
// ************BlackListedChecking********************
    const isBlacklisted=blacklistedStaff.some((staff)=>
    Object.keys(staff).some((key)=>staff[key]===details[key])
    )
    setIsBlacklisted(isBlacklisted)

    //Showing Toast
    if(isBlacklisted){
      setShowModal(true)
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Saved Data:", details);
      alert("Form submitted successfully!");
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    // Proceed to the next step in Stepper Form (Implement this as needed)
   onNext()
  };

  const handleAbort = () => {
    setShowModal(false);
   setDetails({name: "",
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
    photo: null,}) 
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
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
      <h3 className="text-lg font-semibold text-red-600">Blacklisted Staff</h3>
      <p className="text-gray-700 mt-2">This staff member is blacklisted.</p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleContinue} // This function will open the next step in the stepper
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Continue
        </button>
        <button
          onClick={handleAbort} // This function will close the popup
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default BasicDetails;
