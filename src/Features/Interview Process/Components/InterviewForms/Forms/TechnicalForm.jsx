const TechnicalForm = () => {
    return (
      <form className="space-y-4 p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold text-yellow-700">Technical Interview Form</h2>
  
        <label className="block">
          Handling of Tools:
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" />
        </label>
  
        <label className="block">
          Fault Diagnosis Skill:
          <textarea className="w-full border rounded px-3 py-2 mt-1"></textarea>
        </label>
  
        <label className="block">
          Electrical Knowledge Level:
          <select className="w-full border rounded px-3 py-2 mt-1">
            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
          </select>
        </label>
  
        <label className="block">
          Additional Comments:
          <textarea className="w-full border rounded px-3 py-2 mt-1"></textarea>
        </label>
  
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    );
  };
  
  export default TechnicalForm;