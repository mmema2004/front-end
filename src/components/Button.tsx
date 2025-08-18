interface ButtonProp {
  name: string;
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
}

const Button = ({ name, backgroundColor, textColor }: ButtonProp) => {
  return (
    <button
      type="submit"
      className="button"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      {name}
    </button>
  );
};

export default Button;
