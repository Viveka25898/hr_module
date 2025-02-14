import { useState } from "react";
import { FaBars, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const SiteManagerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [requisitionOpen, setRequisitionOpen] = useState(false);

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
          Site Manager/Site Manager Name
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-6">
          <li className="px-6 py-2 hover:bg-green-600 cursor-pointer text-sm">

            
              Dashboard
            
          </li>
          <hr className="border-white mx-4" />

          {/* Requisition Request with Dropdown */}
          <li
            className="px-6 text-sm py-2 flex justify-between items-center hover:bg-green-600 cursor-pointer"
            onClick={() => setRequisitionOpen(!requisitionOpen)}
          >
            <NavLink to="/dashboard" end>
  Requisition Request
</NavLink>

            {requisitionOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </li>

          {/* Sub-option: Manpower Request */}
          {requisitionOpen && (
            <ul className="pl-8 bg-green-800">
              <li>
              <NavLink to="/dashboard/manpower-request">
                         Manpower Request
              </NavLink>

                
                
              </li>
            </ul>
          )}
        </ul>
      </div>
    </>
  );
};

export default SiteManagerSidebar;
