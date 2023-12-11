import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchResultPageProfessors() {
  const [department, setDepartment] = useState("");

  const departments = [
    { name: "Any", value: "any" },
    { name: "Computer Science", value: "cs" },
    { name: "Socialogy", value: "socialogy" },
    { name: "Speech", value: "speech" },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <h2 className="mb-3 font-bold">Department</h2>
      <Dropdown
        value={department}
        onChange={(e) => setDepartment(e.value)}
        options={departments}
        optionLabel="name"
        placeholder="Select..."
        className="w-full max-w-xs bg-primary font-poppins"
        pt={{
          input: { className: "font-poppins py-3" },
          panel: { className: "bg-primary font-poppins" },
        }}
      />
      <Link to="abc" className="mb-6 mt-6 flex max-w-4xl items-start gap-10 bg-background px-6 py-5">
        <div>
          <p className="text-black">Quality</p>
          <div className="my-2 bg-green-300 px-3 py-4 text-4xl font-extrabold">
            4.0
          </div>
          <span className="text-gray-700">5 ratings</span>
        </div>

        <div>
          <h3 className="mb-2 text-xl font-bold">Vanessa Abcede</h3>
          <h4 className="mb-2">Sociology</h4>
          <p className="mb-2">Glendale Community College</p>
          <div className="flex items-center gap-3 text-sm">
            <p>
              <b className="text-lg">100% </b>
              would take again
            </p>
            |
            <p>
              <b className="text-lg">2.6</b> level of difficulty
            </p>
          </div>
        </div>
        <button className="ml-auto">
          <i className="pi pi-bookmark"></i>
        </button>
      </Link>
      <Link to="abc" className="mb-6 mt-6 flex max-w-4xl items-start gap-10 bg-background px-6 py-5">
        <div>
          <p className="text-black">Quality</p>
          <div className="my-2 bg-yellow-300 px-3 py-4 text-4xl font-extrabold">
            4.0
          </div>
          <span className="text-gray-700">5 ratings</span>
        </div>

        <div>
          <h3 className="mb-2 text-xl font-bold">Vanessa Abcede</h3>
          <h4 className="mb-2">Sociology</h4>
          <p className="mb-2">Glendale Community College</p>
          <div className="flex items-center gap-3 text-sm">
            <p>
              <b className="text-lg">100% </b>
              would take again
            </p>
            |
            <p>
              <b className="text-lg">2.6</b> level of difficulty
            </p>
          </div>
        </div>
        <button className="ml-auto">
          <i className="pi pi-bookmark"></i>
        </button>
      </Link>
    </main>
  );
}

export default SearchResultPageProfessors;
