import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import CompanyValueCard from "./CompanyValueCard";
import { useEffect, useState } from "react";
import CompanyDefaultCard from "./CompanyDefaultCard";
import { getCompanyBySlug } from "../../services/apiCompany";

const ratingData = [
  "reputation",
  "companyCulture",
  "opportunitiesForAdvancement",
  "workLifeBalance",
  "employeeBenefits",
  "leadershipAndManagement",
  "innovationAndTechnologyAdoption",
  "diversityAndInclusion",
  "corporateSocialResponsibility",
  "financialStability",
];

function CompareCompanies() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFirstDefaultCard, setShowFirstDefaultCard] = useState(true);
  const [showSecondDefaultCard, setShowSecondDefaultCard] = useState(true);
  const [showFirstValueCard, setShowFirstValueCard] = useState(false);
  const [showSecondValueCard, setShowSecondValueCard] = useState(false);
  const [firstCompanyData, setFirstCompanyData] = useState([]);
  const [secondCompanyData, setSecondCompanyData] = useState([]);

  async function fetchCompanyData(companySlug) {
    try {
      const response = await getCompanyBySlug(companySlug);
      return response;
    } catch (error) {}
  }

  function handleResetCompaniesData() {
    setFirstCompanyData([]);
    setSecondCompanyData([]);
    navigate("/compare/companies");
  }
  console.log("firstCompanyData", firstCompanyData);
  useEffect(() => {
    async function initialCheckup() {
      const pathParts = location.pathname.split("/").filter(Boolean);

      switch (pathParts.length) {
        // DEFAULT URL: compare/companies
        case 2:
          setShowFirstDefaultCard(true);
          setShowSecondDefaultCard(true);
          setShowFirstValueCard(false);
          setShowSecondValueCard(false);
          break;

        //compare/companies/:slug
        case 3:
          if (firstCompanyData?.length === 0) {
            const res = await fetchCompanyData(pathParts[pathParts.length - 1]);
            setFirstCompanyData(res.company);
          }
          setShowFirstDefaultCard(false);
          setShowFirstValueCard(true);
          break;

        //compare/companies/:slug/:slug
        case 4:
          if (firstCompanyData?.length === 0) {
            const res = await fetchCompanyData(pathParts[pathParts.length - 2]);
            setFirstCompanyData(res.company);
          }
          if (secondCompanyData?.length === 0) {
            const res = await fetchCompanyData(pathParts[pathParts.length - 1]);
            setSecondCompanyData(res.company);
          }
          setShowFirstDefaultCard(false);
          setShowSecondDefaultCard(false);
          setShowFirstValueCard(true);
          setShowSecondValueCard(true);
        default:
          break;
      }
    }
    initialCheckup();
  }, [location.pathname]);

  return (
    <main className="mx-auto px-4 py-16 xl:container">
      <div className="mb-8 flex flex-wrap justify-between gap-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Compare Companies
        </h1>
        <div className="flex flex-wrap gap-4">
          <div>
            <Button
              type="primary"
              text="Reset"
              onClick={handleResetCompaniesData}
            />
          </div>
          <div>
            <Button type="primary" text="Share Comparison" />
          </div>
        </div>
      </div>
      <div className="grid max-w-6xl gap-3 md:grid-cols-2">
        <div className="relative">
          {showFirstDefaultCard && <CompanyDefaultCard companyNo={1} />}
          {showFirstValueCard && (
            <CompanyValueCard companyData={firstCompanyData} companyNo={1} />
          )}
          <div className="absolute top-[272px] -right-36 hidden transform lg:block">
            {ratingData.map((rating, i) => (
              <div
                key={i}
                className="mb-8 text-center font-semibold capitalize"
              >
                {rating}
              </div>
            ))}
          </div>
        </div>
        {showSecondDefaultCard && <CompanyDefaultCard companyNo={2} />}
        {showSecondValueCard && (
          <CompanyValueCard companyData={secondCompanyData} companyNo={2} />
        )}
      </div>
    </main>
  );
}

export default CompareCompanies;
