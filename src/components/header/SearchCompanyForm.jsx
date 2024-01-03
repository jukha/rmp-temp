import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styled from "styled-components";
import { getCompanySuggestions } from "../../services/apiCompany";

const CompanyReactSearchAutocomplete = styled(ReactSearchAutocomplete)`
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

function SearchCompanyForm({
  onSelect,
  onSetData,
  disabled,
  onClear,
  ignoreHandleEnter = false,
}) {
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItem, setSearchItem] = useState(null);
  const searchBarParentRef = useRef(null);
  const navigate = useNavigate();

  async function handleCompanySearch(string, results) {
    setSearchQuery(string);
    const apiResponse = await getCompanySuggestions(string);
    if (onSetData) {
      onSetData(apiResponse.suggestions);
    }
    // Transform the API response to match the expected format
    const suggestions = apiResponse.suggestions.map((item) => ({
      id: item._id,
      name: item.name,
      slug: item.slug,
    }));

    setCompanySuggestions(suggestions);
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
      onSelect(item);
      return;
    }
    if (searchBarParentRef) {
      searchBarParentRef.current.querySelector("input").blur();
    }

    setSearchItem(item);
    navigate(`/companies/${item.slug}`);
  }

  function handleClear() {
    if (onClear) {
      onClear();
    }
    if (searchBarParentRef) {
      searchBarParentRef.current.querySelector("input").blur();
    }
  }

  useEffect(() => {
    function callback(e) {
      if (e.code === "Enter" && !ignoreHandleEnter) {
        if (searchBarParentRef) {
          if (
            searchBarParentRef.current.querySelector("input") ===
            document.activeElement
          ) {
            if (!searchItem) {
              searchBarParentRef.current.querySelector("input").blur();
              navigate(`/companies?q=${searchQuery}`);
            }
          }
        }
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [searchQuery]);

  return (
    <div
      className="flex flex-grow flex-wrap items-center gap-4 sm:flex-nowrap"
      ref={searchBarParentRef}
    >
      <CompanyReactSearchAutocomplete
        items={companySuggestions}
        showIcon={false}
        formatResult={formatResult}
        onSelect={handleSelect}
        onClear={handleClear}
        className={disabled ? "pointer-events-none" : "pointer-events-auto"} // for disabling purpose
        placeholder="Search Company"
        onSearch={handleCompanySearch}
        inputDebounce={100}
      />
    </div>
  );
}

export default SearchCompanyForm;
