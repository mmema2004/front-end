import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";

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
        {login === "loginpassword" ? (
          <Link to="/forget">Forgot Password?</Link>
        ) : (
          ""
        )}
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
            <p className="error">{fieldState.error?.message || "\u00A0"}</p>
          </>
        )}
      />
    </div>
  );
};

export default InputForm;
