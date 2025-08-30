import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import "../css/Inputform.css";

export type UserformProp = {
  labelName: string;
  typeform: string;
  placeholderLabel?: string | null;
  validatingName: string;
  control: any;
  login?: string;
};

const InputForm = ({
  typeform,
  placeholderLabel,
  validatingName,
  control,
  labelName,
  login,
}: UserformProp) => {
  return (
    <div className="inputform">
      <div className="label-row">
        <label className="name-label">{labelName}</label>
        <section className="forgot-row">
          {login === "loginpassword" ? (
            <Link to="/forget" className="forgot-label">
              Forgot Password?
            </Link>
          ) : (
            ""
          )}
        </section>
      </div>
      <Controller
        name={validatingName}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              type={typeform}
              autoComplete="off"
              value={field.value || ""}
              autoSave="off"
              className="input"
              placeholder={placeholderLabel ?? ""}
            />
            <label className="error">
              {fieldState.error?.message || "\u00A0"}
            </label>
          </>
        )}
      />
    </div>
  );
};

export default InputForm;
