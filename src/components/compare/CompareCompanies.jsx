import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import CompanyValueCard from "./CompanyValueCard";
import { useEffect, useState } from "react";
import CompanyDefaultCard from "./CompanyDefaultCard";
import { getCompanyBySlug } from "../../services/apiCompany";
import CardSkeleton from "../../ui/CardSkeleton";

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
  const [firstCompanyDataLoading, setFirstCompanyDataLoading] = useState(false);
  const [secondCompanyDataLoading, setSecondCompanyDataLoading] =
    useState(false);

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
            try {
              setFirstCompanyDataLoading(true);
              const res = await fetchCompanyData(
                pathParts[pathParts.length - 1],
              );
              setFirstCompanyData(res.company);
            } catch (error) {
              console.log(error);
            } finally {
              setFirstCompanyDataLoading(false);
            }
          }
          setShowFirstDefaultCard(false);
          setShowFirstValueCard(true);
          break;

        //compare/companies/:slug/:slug
        case 4:
          if (firstCompanyData?.length === 0) {
            try {
              setFirstCompanyDataLoading(true);
              const res = await fetchCompanyData(
                pathParts[pathParts.length - 2],
              );
              setFirstCompanyData(res.company);
            } catch (error) {
              console.log(error);
            } finally {
              setFirstCompanyDataLoading(false);
            }
          }

          if (secondCompanyData?.length === 0) {
            try {
              const res = await fetchCompanyData(
                pathParts[pathParts.length - 1],
              );
              setSecondCompanyData(res.company);
            } catch (error) {
              console.log(error);
            } finally {
              setSecondCompanyDataLoading(false);
            }
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
          {!firstCompanyDataLoading && showFirstDefaultCard && (
            <CompanyDefaultCard companyNo={1} />
          )}
          {firstCompanyDataLoading && <CardSkeleton />}
          {showFirstValueCard && (
            <CompanyValueCard companyData={firstCompanyData} companyNo={1} />
          )}
          <div className="absolute -right-36 top-[272px] hidden transform lg:block">
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
        {!secondCompanyDataLoading && showSecondDefaultCard && (
          <CompanyDefaultCard companyNo={2} />
        )}
        {secondCompanyDataLoading && <CardSkeleton />}
        {showSecondValueCard && (
          <CompanyValueCard companyData={secondCompanyData} companyNo={2} />
        )}
      </div>
    </main>
  );
}

export default CompareCompanies;
