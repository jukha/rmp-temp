import { Link } from "react-router-dom";

function Button({ to, type, htmlType = "button", size, text, onClick }) {
  const base =
    "block w-full transition text-base py-2 px-12 rounded-[34px] font-medium focus:outline-none";
  const primaryStyles = "bg-primary hover:bg-accent text-white";
  const secondaryStyles =
    "border bg-transparent border-primary text-primary hover:bg-primary hover:text-white";

  const buttonStyles =
    type === "primary"
      ? `${base} ${primaryStyles}`
      : `${base} ${secondaryStyles}`;

  if (to)
    return (
      <Link className={buttonStyles} to={to}>
        {text}
      </Link>
    );
  return (
    <button className={buttonStyles} type={htmlType} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
