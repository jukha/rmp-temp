import "./App.css";
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
import SavedProfessors from "./components/account/saved-professors/SavedProfessors";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import SearchResultPageSchools from "./components/search-result/SearchResultPageSchools";
import SearchResultPageProfessors from "./components/search-result/SearchResultPageProfessors";
import DetailPageProfessor from "./components/search-result/DetailPageProfessor";
import DetailPageSchool from "./components/search-result/DetailPageSchool";
import AddProfessor from "./components/add/AddProfessor";
import CompareSchools from "./components/compare/CompareSchools";
import CompareProfessors from "./components/compare/CompareProfessors";
import AddSchool from "./components/add/AddSchool";
import AddProfessorRatings from "./components/add/AddProfessorRatings";
import AddSchoolRatings from "./components/add/AddSchoolRatings";
import CopyRight from "./pages/Copyright";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import SiteGuidelines from "./pages/SiteGuidelines";
import ComingSoon from "./pages/ComingSoon";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route path="/site-guidelines" element={<SiteGuidelines />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
              <Route path="saved-professors" element={<SavedProfessors />} />
            </Route>
            <Route path="/school" element={<SearchResultPageSchools />} />
            <Route path="school/:id" element={<DetailPageSchool />} />
            <Route path="/add/school" element={<AddSchool />} />
            <Route
              path="/add/school-rating/:id"
              element={<AddSchoolRatings />}
            />
            <Route
              path="/compare/schools/:id/:id"
              element={<CompareSchools />}
            />

            <Route path="/professor" element={<SearchResultPageProfessors />} />
            <Route path="professor/:id" element={<DetailPageProfessor />} />
            <Route path="/add/professor" element={<AddProfessor />} />
            <Route
              path="/add/professor-rating/:id"
              element={<AddProfessorRatings />}
            />
            <Route
              path="/compare/professors/:id/:id"
              element={<CompareProfessors />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
