import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";
import SearchProfessorForm from "./SearchProfessorForm";
import SearchSchoolForm from "./SearchSchoolForm";

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
  const [searchBy, setSearchBy] = useState("professors");
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const userInitials = "JS";
  const userName = "Jack";

  const searchByTypes = [
    { name: "Professors", value: "professors" },
    { name: "Schools", value: "schools" },
  ];

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
      label: "Saved Professors",
      icon: "pi pi-save",
      command: () => navigate("account/saved-professors"),
    },
    { label: "Logout", icon: "pi pi-sign-out", command: () => logout() },
  ];

  return (
    <header className="bg-background">
      <nav className="container mx-auto flex items-center justify-between gap-7 px-4 py-6">
        {!isAuthenticated && (
          <ul className="flex items-center gap-5">
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
        )}
        <Logo />
        {isAuthenticated && (
          <div className="flex flex-grow items-center gap-4">
            <Dropdown
              value={searchBy}
              onChange={(e) => setSearchBy(e.value)}
              options={searchByTypes}
              optionLabel="name"
              placeholder="Select a City"
              className="bg-primary  font-poppins"
              pt={{
                input: { className: "font-poppins py-3" },
                panel: { className: "bg-primary font-poppins" },
              }}
            />
            {searchBy === "schools" ? (
              <SearchSchoolForm />
            ) : (
              <SearchProfessorForm />
            )}
          </div>
        )}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <p>Welcome {userName}!</p>
            <button
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-xl uppercase text-white"
              onClick={(e) => userMenuRef.current.toggle(e)}
            >
              {userInitials}
            </button>
            <CustomMenu model={items} popup={true} ref={userMenuRef} />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div>
              <Button text="Log In" to="/login" />
            </div>
            <div>
              <Button text="Sign Up" type="primary" to="/signup" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
