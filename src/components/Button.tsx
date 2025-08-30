import "../css/Button.css";

interface ButtonProp {
  name: string;
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
  border?: string;
  width: string;
}

const Button = ({
  name,
  backgroundColor,
  textColor,
  borderColor,
  border,
  width,
}: ButtonProp) => {
  return (
    <button
      type="submit"
      className="button"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        borderColor: borderColor,
        border: border,
        width: width,
      }}
    >
      <label className="button-label">{name}</label>
    </button>
  );
};

export default Button;
