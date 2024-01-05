import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import CompanyValueCard from "./CompanyValueCard";
import CompanyDefaultCard from "./CompanyDefaultCard";
import { getCompanyBySlug } from "../../services/apiCompany";
import CardSkeleton from "../../ui/CardSkeleton";
import { toast } from "react-toastify";

const ratingData = [
  "Reputation",
  "Company culture",
  "Opportunities for advancement",
  "Work life balance",
  "Employee benefits",
  "Leadership and management",
  "Innovation and technology adoption",
  "Diversity and inclusion",
  "Corporate social responsibility",
  "Financial stability",
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
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleResetCompaniesData() {
    setFirstCompanyData([]);
    setSecondCompanyData([]);
    navigate("/compare/companies");
  }

  async function handleShareComparison() {
    try {
      const textToCopy = window.location.href;
      await navigator.clipboard.writeText(textToCopy);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error(`Unable to copy to clipboard: ${err.message}`);
    }
  }
  console.log(firstCompanyData);
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
              setFirstCompanyData(res?.company);
            } catch (error) {
              toast.error(error.message);
            } finally {
              setFirstCompanyDataLoading(false);
            }
          }
          setShowFirstDefaultCard(false);
          setShowFirstValueCard(true);
          break;

        //compare/companies/:slug/:slug
        case 4:
          // Sent concurrent requests if both companies data needs to be fetched
          if (
            firstCompanyData?.length === 0 &&
            secondCompanyData?.length === 0
          ) {
            const promisesArr = [
              (async () => {
                try {
                  setFirstCompanyDataLoading(true);
                  const res = await fetchCompanyData(
                    pathParts[pathParts.length - 2],
                  );
                  setFirstCompanyData(res?.company);
                } catch (error) {
                  toast.error(error.message);
                }
              })(),
              (async () => {
                try {
                  setSecondCompanyDataLoading(true);
                  const res = await fetchCompanyData(
                    pathParts[pathParts.length - 1],
                  );
                  setSecondCompanyData(res?.company);
                } catch (error) {
                  toast.error(error.message);
                }
              })(),
            ];
            await Promise.all(promisesArr);
            // console.log("hi", result);
            setFirstCompanyDataLoading(false);

            setSecondCompanyDataLoading(false);

            setShowFirstDefaultCard(false);

            setShowSecondDefaultCard(false);

            setShowFirstValueCard(true);

            setShowSecondValueCard(true);
            return;
          }
          if (firstCompanyData?.length === 0) {
            try {
              setFirstCompanyDataLoading(true);
              const res = await fetchCompanyData(
                pathParts[pathParts.length - 2],
              );
              setFirstCompanyData(res?.company);
            } catch (error) {
              toast.error(error.message);
            } finally {
              setFirstCompanyDataLoading(false);
            }
          }
          if (secondCompanyData?.length === 0) {
            try {
              setSecondCompanyDataLoading(true);
              const res = await fetchCompanyData(
                pathParts[pathParts.length - 1],
              );
              setSecondCompanyData(res?.company);
            } catch (error) {
              toast.error(error.message);
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
              disabled={showFirstDefaultCard && showSecondDefaultCard}
              onClick={handleResetCompaniesData}
            />
          </div>
          <div>
            <Button
              type="primary"
              text="Share Comparison"
              onClick={handleShareComparison}
              disabled={showFirstDefaultCard || showSecondDefaultCard}
            />
          </div>
        </div>
      </div>
      <div className="grid max-w-6xl gap-3 lg:grid-cols-2">
        <div className="relative">
          {!firstCompanyDataLoading && showFirstDefaultCard && (
            <CompanyDefaultCard companyNo={1} />
          )}
          {firstCompanyDataLoading && <CardSkeleton />}
          {showFirstValueCard && (
            <CompanyValueCard companyData={firstCompanyData} companyNo={1} />
          )}
          {(firstCompanyData?.ratings?.data?.length > 0 ||
            secondCompanyData?.ratings?.data?.length > 0) && (
            <div className="absolute -right-32 top-[272px] hidden transform lg:block">
              {ratingData.map((rating, i) => (
                <div key={i} className="mb-8 text-center font-semibold">
                  {rating}
                </div>
              ))}
            </div>
          )}
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
