import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";

function Footer() {
  return (
    <footer className="bg-primary p-10">
      <div className="xl:container mx-auto flex flex-wrap justify-between gap-8 lg:gap-4 px-4 text-white">
        <nav>
          <ul>
            <h4 className="mb-7 text-xl font-semibold uppercase">Site</h4>
            <li className="py-1">
              <Link
                to="/coming-soon"
                className="text-[18px] font-light text-[#E8EDFF]"
              >
                About
              </Link>
            </li>

            <li className="py-1">
              <Link
                to="/coming-soon"
                className="text-[18px] font-light text-[#E8EDFF]"
              >
                Help
              </Link>
            </li>

            <li className="py-1">
              <Link
                to="/site-guidelines"
                className="text-[18px] font-light text-[#E8EDFF]"
              >
                Site Guidelines
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            <h4 className="mb-7 text-xl font-semibold uppercase">Legal</h4>
            <li className="py-1">
              <Link
                to="/terms-of-use"
                className="text-[18px] font-light text-[#E8EDFF]"
              >
                Terms & Conditions
              </Link>
            </li>

            <li className="py-1">
              <Link
                to="/privacy-policy"
                className="text-[18px] font-light text-[#E8EDFF]"
              >
                Privacy Policy
              </Link>
            </li>

            <li className="py-1">
              <Link
                to="/copyright"
                className="text-[18px] font-light text-[#E8EDFF]"
              >
                Copyright Compliance Policy
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            <h4 className="mb-7 text-xl font-semibold uppercase">Partners</h4>
            <li className="py-1">
              <Link to="/" className="text-[18px] font-light text-[#E8EDFF]">
                Partner 1
              </Link>
            </li>

            <li className="py-1">
              <Link to="/" className="text-[18px] font-light text-[#E8EDFF]">
                Partner 2
              </Link>
            </li>

            <li className="py-1">
              <Link to="/" className="text-[18px] font-light text-[#E8EDFF]">
                Partner 3
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <div className="max-w-max border border-white">
            <Logo />
          </div>
          <h4 className="my-4 text-xl font-semibold uppercase">
            About company
          </h4>
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
          <p className="mt-4">&copy; 2023 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
