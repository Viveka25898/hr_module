const HkForm = () => {
    return (
      <form className="space-y-4 p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold text-blue-700">Housekeeping Interview Form</h2>
  
        <label className="block">
          Hygiene Knowledge:
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" />
        </label>
  
        <label className="block">
          Familiarity with Cleaning Tools:
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" />
        </label>
  
        <label className="block">
          Punctuality:
          <select className="w-full border rounded px-3 py-2 mt-1">
            <option value="">Select</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
          </select>
        </label>
  
        <label className="block">
          Behavior with Staff & Guests:
          <textarea className="w-full border rounded px-3 py-2 mt-1"></textarea>
        </label>
  
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    );
  };
  
  export default HkForm;