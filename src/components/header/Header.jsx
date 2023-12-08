import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const userInitials = "JS";
  const userName = "Jack";
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

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
      icon: "pi pi-fw pi-trash",
      command: () => navigate("account/ratings"),
    },
    {
      label: "Saved Professors",
      icon: "pi pi-star-fill",
      command: () => navigate("account/saved-professors"),
    },
    { label: "Logout", icon: "pi pi-sign-out", command: () => logout() },
  ];

  return (
    <header className="bg-background">
      <nav className="container mx-auto flex items-center justify-between px-4 py-8">
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
        <Logo />
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <p>Welcome {userName}!</p>
            <button
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-xl uppercase text-white"
              onClick={(e) => userMenuRef.current.toggle(e)}
            >
              {userInitials}
            </button>
            <Menu model={items} popup={true} ref={userMenuRef} />
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
