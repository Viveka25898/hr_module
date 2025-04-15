/* eslint-disable react/prop-types */
const MissingFieldHighlighter = ({ label, value, onChange, name }) => {
    const isMissing = value === "";
    return (
      <div className="mb-4">
        <label className="block font-semibold mb-1">{label}</label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded ${
            isMissing ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
        />
        {isMissing && (
          <p className="text-red-500 text-sm mt-1">This field is required.</p>
        )}
      </div>
    );
  };
  
  export default MissingFieldHighlighter;
  