const TechnicalForm = () => {
    return (
      <form className="space-y-4 p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold text-yellow-700">Technical Interview Form</h2>

        <label className="block">
        Upload CV:
        <input
          type="file"
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>


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

        <div className="block">
        <span className="block font-medium mb-1">
          Relative work in the Company:
        </span>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="relativeWork" value="yes" />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="relativeWork" value="no" />
            <span>No</span>
          </label>
        </div>
      </div>
  
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    );
  };
  
  export default TechnicalForm;