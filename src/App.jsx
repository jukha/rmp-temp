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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
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
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<ForgetPassword />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
