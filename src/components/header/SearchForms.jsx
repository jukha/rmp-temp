import { Dropdown } from "primereact/dropdown";
import SearchJobForm from "./SearchJobForm";
import SearchCompanyForm from "./SearchCompanyForm";
import { useState } from "react";

const searchByTypes = [
  { name: "Jobs", value: "jobs" },
  { name: "Company", value: "companies" },
];

function SearchForms() {
  const [searchBy, setSearchBy] = useState("companies");
  return (
    <div className="flex flex-grow flex-col lg:items-center gap-4 lg:flex-row">
      <Dropdown
        value={searchBy}
        onChange={(e) => setSearchBy(e.value)}
        options={searchByTypes}
        optionLabel="name"
        className="bg-primary  font-poppins w-max"
        pt={{
          input: { className: "font-poppins py-3" },
          panel: { className: "bg-primary font-poppins" },
        }}
      />
      {searchBy === "companies" ? <SearchCompanyForm /> : <SearchJobForm />}
    </div>
  );
}

export default SearchForms;
