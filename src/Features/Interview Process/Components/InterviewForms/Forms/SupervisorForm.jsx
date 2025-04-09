const SupervisorForm = () => {
    return (
      <form className="space-y-4 p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold text-green-700">Supervisor Interview Form</h2>
  
        <label className="block">
          Leadership Qualities:
          <textarea className="w-full border rounded px-3 py-2 mt-1" />
        </label>
  
        <label className="block">
          Attendance Monitoring Strategy:
          <textarea className="w-full border rounded px-3 py-2 mt-1" />
        </label>
  
        <label className="block">
          Communication Skill:
          <select className="w-full border rounded px-3 py-2 mt-1">
            <option>Excellent</option>
            <option>Good</option>
            <option>Average</option>
          </select>
        </label>
  
        <label className="block">
          Discipline Observation:
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" />
        </label>
  
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    );
  };
  
  export default SupervisorForm;
  