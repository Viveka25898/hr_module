/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import HkForm from "./Forms/HKForm";
import TechnicalForm from "./Forms/TechnicalForm";
import SupervisorForm from "./Forms/SupervisorForm";
import ManagerForm from "./Forms/ManagerForm";
import ClusterHeadForm from "./Forms/ClusterHeadForm";

const FormSelector = () => {
  const [selectedForm, setSelectedForm] = useState("");

  const renderForm = () => {
    switch (selectedForm) {
      case "hk":
        return <HkForm />;
      case "technical":
        return <TechnicalForm />;
      case "supervisor":
        return <SupervisorForm />;
      case "manager":
        return <ManagerForm />;
      case "clusterHead":
        return <ClusterHeadForm />;
      default:
        return <p className="text-gray-600 mt-4">Please select a form type above.</p>;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Select Interview Assessment Form</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${selectedForm === "hk" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedForm("hk")}
        >
          Housekeeping (HK)
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedForm === "technical" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedForm("technical")}
        >
          Technical
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedForm === "supervisor" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedForm("supervisor")}
        >
          Supervisor
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedForm === "manager" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedForm("manager")}
        >
          Manager
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedForm === "clusterHead" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedForm("clusterHead")}
        >
          Cluster Head
        </button>
      </div>

      <div>{renderForm()}</div>
    </div>
  );
};

export default FormSelector;
