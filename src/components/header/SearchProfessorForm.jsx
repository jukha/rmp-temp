import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchProfessorForm() {
  const [professorName, setProfessorName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!professorName || !schoolName) return;
    navigate("/professor")
  }
  return (
    <form className="flex flex-grow items-center gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full rounded-xl p-3"
        placeholder="Professor name"
        value={professorName}
        onChange={(e) => setProfessorName(e.target.value)}
      />
      <p>at</p>
      <input
        type="text"
        className="w-full rounded-xl p-3"
        placeholder="Your School"
        value={schoolName}
        onChange={(e) => setSchoolName(e.target.value)}
      />
      <button type="submit" hidden></button>
    </form>
  );
}

export default SearchProfessorForm;
