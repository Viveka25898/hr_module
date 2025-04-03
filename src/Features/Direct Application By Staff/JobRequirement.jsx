/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const JobRequirement = () => {
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        jobTitle:"",
        jobType:"",
        prefferedLocation:"",
        experience:"",
        salaryExpectation:"",
        additionalNotes:""
    })
    const [errors,setErrors]=useState({})

    //Handle Change
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }

    //Validate Form
    const validateForm=()=>{
        let newErrors={}
        if(!formData.jobTitle) newErrors.jobTitle="Job title is Required"
        if(!formData.jobType) newErrors.jobType="Job type is Required"
        if(!formData.prefferedLocation) newErrors.prefferedLocation="Preffered Location is Required"
        if(!formData.experience) newErrors.experience="Experience is Required"
        if(!formData.salaryExpectation) newErrors.salaryExpectation="Salary Expectation is Required"
        setErrors(newErrors)
        return Object.keys(newErrors).length===0
    }

    //Handle Form Submit
    const handleFormSubmit=(e)=>{
        e.preventDefault()
        if(validateForm()){
            console.log("Form Data:-",formData);
            toast.success("Job Requirement Submitted Successfully!",{
                position:"top-right",
                autoClose:3000,
                closeOnClick:true
            })
            setFormData({
                jobTitle:"",
                jobType:"",
                prefferedLocation:"",
                experience:"",
                salaryExpectation:"",
                additionalNotes:""
            })
            navigate("/dashboard/candidate/email-aadhar-verification")
        }
    }



  return (
    <>
    <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
        <div className=' w-full max-w-xl bg-white p-6 rounded-lg shadow-lg border border-gray-700'>
            <h2 className='text-2xl font-bold text-center mb-4 text-gray-700'>Job Requirement Form</h2>
            <form className='space-y-4' onSubmit={handleFormSubmit}>
                <div>
                    <label className='block font-semibold'>Job Title</label>
                    <input type="text"
                    name='jobTitle'
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className='w-full border p-2 rounded'
                    />
                    {errors.jobTitle && <p className='text-red-500 text-sm'>{errors.jobTitle}</p>}
                </div>

                <div>
                <label className="block font-semibold">Job Type</label>
                    <select name="jobType" 
                    value={formData.jobType}
                    onChange={handleChange}
                    className='w-full border p-2 rounded'
                    >
                        <option value="">Select Job Type</option>
                        <option value="Full-Time">Full Time</option>
                        <option value="Part-Time">Part Time</option>
                        <option value="Contract">Contract</option>
                    </select>
                    {errors.jobType && <p className='text-red-500 text-sm'>{errors.jobType}</p>}
                </div>

                <div>
                <label className="block font-semibold">Preferred Location</label>
                    <input type="text"
                    name='prefferedLocation'
                    value={formData.prefferedLocation}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    />
                    {errors.prefferedLocation && <p className='text-red-500 text-sm'>{errors.prefferedLocation}</p>}
                </div>

                <div>
                <label className="block font-semibold">Experience (in years)</label>
                    <input type="number" 
                    name='experience'
                    value={formData.experience}
                    onChange={handleChange}
                    className='w-full border p-2 rounded'
                    />
                    {errors.experience && <p className='text-red-500 text-sm'>{errors.experience}</p>}
                </div>

                <div>
                <label className="block font-semibold">Salary Expectation</label>
                    <input type="text" 
                    name="salaryExpectation"
                    value={formData.salaryExpectation}
                    onChange={handleChange}
                    className="w-full border p-2 rounded" />
                    {errors.salaryExpectation && <p className='text-red-500 text-sm'>{errors.salaryExpectation}</p>}
                </div>

                <div>
                 <label className="block font-semibold">Additional Notes</label>
                    <textarea 
                    name="additionalNotes" 
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="w-full border p-2 rounded" rows="3">   
                    </textarea>
                    {errors.additionalNotes && <p className='text-red-500 text-sm'>{errors.additionalNotes}</p>}
                </div>

                <button
                type='submit'
                className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition'
                >
                    Submit
                </button>


            </form>
        </div>
    </div>
    </>
  )
}

export default JobRequirement