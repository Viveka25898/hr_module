/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManpowerRequestForm = () => {


  // *******************************Assume remaining budget is 20000 (since backend API is not ready)********************************
  const remainingBudget = 20000;
    
  // Get the selected site from Redux (Provide a default value to prevent undefined errors)
  const selectedSite = useSelector((state) => state.site.selectedSite || "Select a Site");
  console.log("Manpower Request:-",selectedSite);
  //*************Taking Site Manager Username from Store********************* */
  const managerName=useSelector((state)=>state.auth.user)
  console.log(managerName);
    // State Management
  const [formData, setFormData] = useState({
    siteName:selectedSite,
    staffType: "",
    skill: "",
    grade: "",
    department: "",
    budget: "",
    location: "",
    isUnbudgeted: false, // Track if request is unbudgeted
  });

  const [errors, setErrors] = useState({});

  // *********************************Update Sitename whenever selected site name changes************************
  useEffect(() => {
    if (selectedSite) {
      setFormData((prev) => ({
        ...prev,
        siteName: selectedSite,
      }));
    }
  }, [selectedSite]);
  //***************************Toast Code*****************************************/
  const showToast=()=>{
    toast.success("Manpower Request Submitted Successfully! 🚀", {
      position: "top-right"
    });

  }



  //  Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    //  Budget Validation: If entered budget is greater than remaining budget, mark as Unbudgeted
    if (name === "budget") {
      const enteredBudget = parseInt(value) || 0;
      updatedFormData.isUnbudgeted = enteredBudget > remainingBudget;
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [name]: "" }); // Clear validation errors
  };

  //  Form Validation
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "isUnbudgeted") newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle Form Submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     toast.success("Manpower Request Submitted Successfully! 🚀", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });

  //     //  Save request in Redux store
  //     dispatch(submitRequest(formData));

  //     //  Store request in Local Storage
  //     const existingRequests = JSON.parse(localStorage.getItem("manpowerRequests")) || [];
  //     const updatedRequests = [...existingRequests, formData];
  //     localStorage.setItem("manpowerRequests", JSON.stringify(updatedRequests));

  //     //  Clear Form Fields After Submission
  //     setFormData({
  //       staffType: "",
  //       skill: "",
  //       grade: "",
  //       department: "",
  //       budget: "",
  //       location: "",
  //       isUnbudgeted: false, // Reset budget state
  //     });
  //   }
  // };


  //***********************************Handle Form Submit Logic ***********************************************************

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Check if the request is Unbudgeted
      const isUnBudgeted = parseInt(formData.budget) > remainingBudget;
  
      // Add the request with status & budget flag
      const newRequest = { 
        id: Date.now().toString(),
        ...formData, 
        isUnBudgeted, 
        supervisorStatus: "Pending" ,
        date: new Date().toISOString(),// Store submission date
        managerName  //Storing Manager Name to the Local Storage       
      };
  
      // Save to localStorage
      const existingRequests = JSON.parse(localStorage.getItem("manpowerRequests")) || [];
      existingRequests.push(newRequest);
      localStorage.setItem("manpowerRequests", JSON.stringify(existingRequests));
  
      // Show Toaster
      showToast();
      
      // Reset Form Fields
      console.log("Form Data",formData);
      setFormData({
        siteName: selectedSite,
        staffType: "",
        skill: "",
        grade: "",
        department: "",
        budget: "",
        location: "",
      });
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center font-mulish">Manpower Request Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        
           <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Site Name</label>
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              readOnly // Prevent manual changes
              className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed"
            />
          </div> 
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Staff Type</label>
            <select name="staffType" value={formData.staffType} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="">Select Staff Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.staffType && <p className="text-red-500 text-sm">{errors.staffType}</p>}
          </div>

          {/*  Skill */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Skill</label>
            <input
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter skill"
            />
            {errors.skill && <p className="text-red-500 text-sm">{errors.skill}</p>}
          </div>

          {/*  Grade */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Grade</label>
            <select name="grade" value={formData.grade} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="">Select Grade</option>
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
            </select>
            {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}
          </div>

          {/*  Department */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Department</label>
            <select name="department" value={formData.department} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
            {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
          </div>

          {/*  Budget with Validation */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter budget"
            />
            {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}

            {/*  Show Warning for Unbudgeted Requests */}
            {formData.isUnbudgeted && <p className="text-red-600 text-sm mt-1">This is an Unbudgeted Request</p>}
          </div>

          {/*  Location */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter location"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          {/*  Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-md transition ${
              formData.isUnbudgeted ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            Submit to Supervisor
          </button>

        </form>
      </div>
    </div>
  );
};

export default ManpowerRequestForm;
