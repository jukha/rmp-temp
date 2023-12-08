import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchSchoolForm() {
  const [schoolName, setSchoolName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!schoolName) return;
    navigate("/school");
  }

  return (
    <form className="flex-grow" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full rounded-xl p-3"
        placeholder="Your School"
        value={schoolName}
        onChange={(e) => setSchoolName(e.target.value)}
      />
    </form>
  );
}

export default SearchSchoolForm;
