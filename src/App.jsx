import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import AppLayout from "./pages/AppLayout";
import AccountLayout from "./pages/AccountLayout";
import Profile from "./components/account/profile/Profile";
import AccountSettings from "./components/account/account-settings/AccountSettings";
import Ratings from "./components/account/ratings/Ratings";
import SavedJobs from "./components/account/saved-jobs/SavedJobs";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import SearchResultPageCompanies from "./components/search-result/SearchResultPageCompanies";
import SearchResultPageJobs from "./components/search-result/SearchResultPageJobs";
import DetailPageJob from "./components/search-result/DetailPageJob";
import DetailPageCompany from "./components/search-result/DetailPageCompany";
import AddJob from "./components/add/AddJob";
import CompareCompanies from "./components/compare/CompareCompanies";
import CompareJobs from "./components/compare/CompareJobs";
import AddCompany from "./components/add/AddCompany";
import AddJobRatings from "./components/add/AddJobRatings";
import AddCompanyRatings from "./components/add/AddCompanyRatings";
import CopyRight from "./pages/Copyright";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import SiteGuidelines from "./pages/SiteGuidelines";
import ComingSoon from "./pages/ComingSoon";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CompanyAllJobs from "./components/search-result/CompanyAllJobs";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <ToastContainer autoClose={3000} bodyClassName="font-poppins" />
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/site-guidelines" element={<SiteGuidelines />} />
              {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
              <Route path="/copyright" element={<CopyRight />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="*" element={<ComingSoon />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="profile" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<AccountSettings />} />
                <Route path="ratings" element={<Ratings />} />
                <Route path="saved-jobs" element={<SavedJobs />} />
              </Route>
              {/* COMPANY */}
              <Route
                path="/companies"
                element={<SearchResultPageCompanies />}
              />
              <Route path="companies/:id" element={<DetailPageCompany />} />
              <Route path="/add/company" element={<AddCompany />} />
              <Route
                path="/add/company-rating/:id"
                element={<AddCompanyRatings />}
              />

              <Route path="/compare/companies" element={<CompareCompanies />} />
              <Route
                path="/compare/companies/:id"
                element={<CompareCompanies />}
              />
              <Route
                path="/compare/companies/:id/:id"
                element={<CompareCompanies />}
              />

              {/* JOBS */}
              <Route path="/jobs" element={<SearchResultPageJobs />} />
              <Route path="jobs/company/:id/*" element={<CompanyAllJobs />} />
              <Route path="jobs/:id" element={<DetailPageJob />} />
              <Route path="/add/job" element={<AddJob />} />
              <Route path="/add/job-rating/:id" element={<AddJobRatings />} />
              <Route path="/compare/jobs/:id/:id" element={<CompareJobs />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget" element={<ForgetPassword />} />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
