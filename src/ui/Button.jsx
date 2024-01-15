import { Link } from "react-router-dom";

function Button({ to, type, htmlType = "button", text, onClick, disabled }) {
  const base =
    "block w-full transition text-base py-2 px-8 sm:px-12 rounded-[34px] font-medium focus:outline-none";
  const primaryStyles = "bg-primary hover:bg-accent text-white";
  const secondaryStyles =
    "border bg-transparent border-primary text-primary hover:bg-primary hover:text-white dark:text-white dark:border-white dark:hover:border-transparent";

  const disabledStyles = "opacity-50 cursor-not-allowed";

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
    <button
      className={`${buttonStyles} ${disabled && disabledStyles}`}
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
