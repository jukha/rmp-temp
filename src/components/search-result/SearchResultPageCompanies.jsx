import { Link } from "react-router-dom";

function SearchResultPageCompanies() {
  return (
    <main className="xl:container mx-auto px-4 py-16">
      <Link
        to="abc"
        className="mb-6 mt-6 flex max-w-4xl flex-wrap items-start gap-10 bg-background px-6 py-5 relative"
      >
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
        <button className="ml-auto absolute top-6 right-6">
          <i className="pi pi-bookmark"></i>
        </button>
      </Link>
    </main>
  );
}

export default SearchResultPageCompanies;
