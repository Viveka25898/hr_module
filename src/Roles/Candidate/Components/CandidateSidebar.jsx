/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'

const CandidateSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
     <>
          {/* Sidebar Toggle Button for Mobile */}
          <button
            className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
    
          {/* Sidebar Container */}
          <div
            className={`fixed top-0 left-0 h-full w-48 bg-green-700 text-white shadow-lg transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform lg:translate-x-0 lg:w-48 lg:block`}
          >
            {/* Sidebar Header */}
            <div className="p-4 text-xl font-semibold bg-green-800 text-center">
             Candidate
            </div>
    
            {/* Sidebar Menu */}
            <ul className="mt-6">
              <li className="px-6 py-2 hover:bg-green-600 cursor-pointer text-sm">
    
                <NavLink to="/dashboard/candidate">
    
                  Dashboard
                </NavLink>
                
              </li>
              <hr className="border-white mx-4" />
              <li className="px-6 py-2 hover:bg-green-600 cursor-pointer text-sm">
    
                <NavLink to="/dashboard/candidate/registration">
    
                  Register
                </NavLink>
                
              </li>
              <hr className="border-white mx-4" />

                <li className="px-6 py-2 hover:bg-green-600 cursor-pointer text-sm">
      
                <NavLink to="/dashboard/candidate/view-offer">

                  View Offer
                </NavLink>
                
              </li>
              <hr className="border-white mx-4" />

              <li className="px-6 py-2 hover:bg-green-600 cursor-pointer text-sm">
      
              <NavLink to="/dashboard/candidate/uniform-form">

                Fill Uniform Form
              </NavLink>
              
            </li>
            <hr className="border-white mx-4" />

            <li className="px-6 py-2 hover:bg-green-600 cursor-pointer text-sm">
      
              <NavLink to="/dashboard/candidate/pf-form">

                PF - Form
              </NavLink>
              
            </li>
            <hr className="border-white mx-4" />
                        
              
             
            </ul>
          </div>
        </>
  )
}

export default CandidateSidebar;