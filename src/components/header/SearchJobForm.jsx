import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styled from "styled-components";
import { getJobSuggestions } from "../../services/apiJob";

const JobReactSearchAutocomplete = styled(ReactSearchAutocomplete)`
  && {
    width: 100%;
    height: 50px;
    font-family: "Poppins", sans-serif;
    .wrapper {
      position: unset;
      border-radius: 12px;
      border: 1px solid #004080;
      background: #f3f3f3;
      padding: 12px;
      & > :first-child {
        min-height: unset;
      }
      & * {
        font-family: "Poppins";
      }
    }
  }
`;

function SearchJobForm({ onSelect, onSetData, disabled }) {
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const navigate = useNavigate();

  async function handleJobSearch(string, results) {
    const apiResponse = await getJobSuggestions(string);
    if (onSetData) {
      onSetData(apiResponse.suggestions);
    }
    // Transform the API response to match the expected format
    const suggestions = apiResponse.suggestions.map((item) => ({
      id: item._id,
      name: item.title,
      slug: item.slug,
    }));

    setJobSuggestions(suggestions);
  }

  function formatResult(item) {
    return (
      <>
        <span
          style={{
            display: "block",
            textAlign: "left",
            marginBlock: "10px",
            cursor: "pointer",
          }}
        >
          {item.name}
        </span>
      </>
    );
  }

  function handleSelect(item) {
    if (onSelect) {
      onSelect();
      return;
    }
    navigate(`/jobs/${item.slug}`);
  }

  return (
    <div className="flex flex-grow flex-wrap items-center gap-4 sm:flex-nowrap">
      <JobReactSearchAutocomplete
        items={jobSuggestions}
        showIcon={false}
        formatResult={formatResult}
        onSelect={handleSelect}
        className={disabled ? "pointer-events-none" : "pointer-events-auto"} // for disabling purpose
        placeholder="Search Jobs"
        onSearch={handleJobSearch}
        inputDebounce={250}
      />
    </div>
  );
}

export default SearchJobForm;
