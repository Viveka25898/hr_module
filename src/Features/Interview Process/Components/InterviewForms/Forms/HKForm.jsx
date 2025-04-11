const HkForm = () => {
  return (
    <form className="space-y-4 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold text-blue-700">Housekeeping Interview Form</h2>

      <label className="block">
        Upload CV:
        <input
          type="file"
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>


      <label className="block">
        Hygiene Knowledge:
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>


      <label className="block">
        Familiarity with Cleaning Tools:
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mt-1"
        />
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
        <textarea
          className="w-full border rounded px-3 py-2 mt-1"
        ></textarea>
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


      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default HkForm;
