import { Dropdown } from "primereact/dropdown";
import SearchProfessorForm from "./SearchJobForm";
import SearchSchoolForm from "./SearchCompanyForm";
import { useState } from "react";

const searchByTypes = [
  { name: "Jobs", value: "jobs" },
  { name: "Company", value: "company" },
];

function SearchForms() {
  const [searchBy, setSearchBy] = useState("jobs");
  return (
    <div className="flex flex-grow flex-wrap items-center gap-4 lg:flex-nowrap">
      <Dropdown
        value={searchBy}
        onChange={(e) => setSearchBy(e.value)}
        options={searchByTypes}
        optionLabel="name"
        placeholder="Select a City"
        className="bg-primary  font-poppins"
        pt={{
          input: { className: "font-poppins py-3" },
          panel: { className: "bg-primary font-poppins" },
        }}
      />
      {searchBy === "company" ? <SearchSchoolForm /> : <SearchProfessorForm />}
    </div>
  );
}

export default SearchForms;
