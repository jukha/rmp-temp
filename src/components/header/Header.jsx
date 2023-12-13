import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import { Menu } from "primereact/menu";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";
import SearchProfessorForm from "./SearchProfessorForm";
import SearchSchoolForm from "./SearchSchoolForm";
import AuthBtnGroup from "./AuthBtnGroup";
import SearchForms from "./SearchForms";

const CustomMenu = styled(Menu)`
  background: #fff;
  font-family: "Poppins";
  & * {
    color: #000;
  }
  & .p-menuitem:hover {
    background-color: #004080;
    & * {
      color: #fff;
    }
  }
`;

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [showMobileAuthGroup, setShowMobileAuthGroup] = useState(false);
  const [showMobileSearchForms, setshowMobileSearchForms] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const userInitials = "JS";
  const userName = "Jack";

  let items = [
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => navigate("account/profile"),
    },
    {
      label: "Account Settings",
      icon: "pi pi-cog",
      command: () => navigate("account/settings"),
    },
    {
      label: "Your Ratings",
      icon: "pi pi-star-fill",
      command: () => navigate("account/ratings"),
    },
    {
      label: "Saved Jobs",
      icon: "pi pi-save",
      command: () => navigate("account/saved-professors"),
    },
    { label: "Logout", icon: "pi pi-sign-out", command: () => logout() },
  ];
  useEffect(() => {
    setShowMobileAuthGroup(false);
    setshowMobileSearchForms(false);
  }, [location.pathname]);
  return (
    <header className="sticky top-0 z-50 bg-background">
      <nav className="mx-auto flex items-center justify-between gap-7 px-4 py-6 xl:container">
        {!isAuthenticated && (
          <>
            <ul className="hidden items-center gap-5 lg:flex">
              <li>
                <a>
                  <i className="pi pi-facebook text-2xl"></i>
                </a>
              </li>
              <li>
                <a>
                  <i className="pi pi-instagram text-2xl"></i>
                </a>
              </li>
              <li>
                <a>
                  <i className="pi pi-twitter text-2xl"></i>
                </a>
              </li>
            </ul>
            <div className="lg:hidden">
              <Button
                text="Join"
                onClick={() => setShowMobileAuthGroup((state) => !state)}
              />
            </div>
          </>
        )}
        <Logo />
        {isAuthenticated && (
          <button
            className="lg:hidden"
            onClick={() => setshowMobileSearchForms(true)}
          >
            <i className="pi pi-search text-xl"></i>
          </button>
        )}
        {isAuthenticated && (
          <div className="hidden lg:block">
            <SearchForms />
          </div>
        )}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <p className="hidden sm:block">Welcome {userName}!</p>
            <button
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-xl uppercase text-white"
              onClick={(e) => userMenuRef.current.toggle(e)}
            >
              {userInitials}
            </button>
            <CustomMenu model={items} popup={true} ref={userMenuRef} />
          </div>
        ) : (
          <div className="hidden lg:block">
            <AuthBtnGroup />
          </div>
        )}
        {/* ======== */}
        {/* Mobile */}
        {/* ======== */}
        {showMobileSearchForms && (
          <div className="fixed left-0 right-0 top-0 flex w-full justify-center bg-white px-4 py-8">
            <button
              className="absolute right-6 top-4"
              onClick={() => setshowMobileSearchForms(false)}
            >
              <i className="pi pi-times"></i>
            </button>
            <SearchForms />
          </div>
        )}
        {showMobileAuthGroup && (
          <div className="fixed left-0 right-0 top-0 flex w-full justify-center bg-white px-4 py-8">
            <button
              className="absolute right-6 top-4"
              onClick={() => setShowMobileAuthGroup(false)}
            >
              <i className="pi pi-times"></i>
            </button>
            <AuthBtnGroup />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
