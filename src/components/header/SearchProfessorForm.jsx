import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchProfessorForm() {
  const [professorName, setProfessorName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!professorName || !schoolName) return;
    navigate("/jobs");
  }
  return (
    <form
      className="flex flex-grow flex-wrap sm:flex-nowrap items-center gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-full rounded-xl p-3"
        placeholder="Job"
        value={professorName}
        onChange={(e) => setProfessorName(e.target.value)}
      />
      <p>at</p>
      <input
        type="text"
        className="w-full rounded-xl p-3"
        placeholder="Company"
        value={schoolName}
        onChange={(e) => setSchoolName(e.target.value)}
      />
      <button type="submit" hidden></button>
    </form>
  );
}

export default SearchProfessorForm;
