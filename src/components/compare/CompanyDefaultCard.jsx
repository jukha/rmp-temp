import { useEffect, useState } from "react";
import SearchCompanyForm from "../header/SearchCompanyForm";
import { useLocation, useNavigate } from "react-router-dom";

function CompanyDefaultCard({ companyNo }) {
  const [companyData, setCompanyData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [disableSecondCompanySearch, setDisableSecondCompanySearch] =
    useState(false);

  function handleSelect() {
    if (companyNo === 1) {
      navigate(`/compare/companies/${companyData[0]?.slug}`);
    } else {
      const pathParts = location.pathname.split("/");
      const firstCompanySlug = pathParts[pathParts.length - 1];
      navigate(
        `/compare/companies/${firstCompanySlug}/${companyData[0]?.slug}`,
      );
    }
  }
  console.log("hi");
  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);

    switch (pathParts.length) {
      // DEFAULT URL: compare/companies
      case 2:
        setDisableSecondCompanySearch(true);
        break;

      //compare/companies/:slug
      case 3:
        setDisableSecondCompanySearch(false);
        break;

      default:
        break;
    }
  }, [location.pathname]);

  return (
    <article>
      <div className="mb-8 flex h-60 flex-col justify-center bg-background px-8 text-center">
        <div>
          <div className="mx-auto mb-8 max-w-max bg-gray-400 p-6 text-4xl font-extrabold">
            N/A
          </div>
          <SearchCompanyForm
            onSelect={handleSelect}
            onSetData={setCompanyData}
            disabled={companyNo === 2 && disableSecondCompanySearch}
          />
        </div>
      </div>
      {Array.from({ length: 11 }).map((_, i) => {
        return (
          <div
            className={`mb-8 flex flex-col items-center gap-4 ${
              companyNo === 1 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
            key={i}
          >
            <div className="grid grid-cols-[repeat(5,57px)] grid-rows-[18px] gap-[2px]">
              {Array.from({ length: 5 }, (_, index) => {
                return (
                  <span
                    key={index}
                    className={`bg-gray-400 ${
                      index === 0
                        ? "rounded-bl-md rounded-tl-md"
                        : index === 4
                          ? "rounded-br-md rounded-tr-md"
                          : ""
                    }`}
                  ></span>
                );
              })}
            </div>
            <span className="hidden h-3 w-3 rounded-full bg-gray-500 sm:inline-block"></span>
          </div>
        );
      })}
    </article>
  );
}

export default CompanyDefaultCard;
