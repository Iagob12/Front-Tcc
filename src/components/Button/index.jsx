import { useState } from "react";
import "../../styles/Button/style.css";

const Button = ({ text, primary = true, onClick, className = "", disabled = false }) => {
  const [hover, setHover] = useState(false);

  const buttonClass = primary
    ? hover && !disabled
      ? "btn-secondary"
      : "btn-primary"
    : hover && !disabled
    ? "btn-primary"
    : "btn-secondary";

  return (
    <button
      className={`${buttonClass} ${className}`}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {text}
    </button>
  );
};

export default Button;
