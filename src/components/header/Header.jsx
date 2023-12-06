import Button from "../../ui/Button";
import Logo from "../../ui/Logo";

function Header() {
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
        <div className="flex items-center gap-3">
          <div>
            <Button text="Log In" to="/login" />
          </div>
          <div>
            <Button text="Sign Up" type="primary" to="/signup" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
