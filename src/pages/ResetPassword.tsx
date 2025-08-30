import type { UserformProp } from "../components/InputForm";
import * as yup from "yup";
import InputForm from "../components/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../util/axios";
import "../css/ResetPassword.css";
import Logo from "../components/Logo";
import { Link } from "react-router";

const resetPassword: Omit<UserformProp, "control">[] = [
  {
    labelName: "Password",
    typeform: "password",
    placeholderLabel: "Your new password",
    validatingName: "password",
  },
];

const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Must be minimum 8 characters")
    .matches(/[A-Z]/, "Must have at least one uppercase letter")
    .matches(/[0-9]/, "Must have at least one number")
    .matches(/[^A-Za-z0-9]/, "Must have at least one special character"),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      const res = await axiosInstance.put("/reset-password", {
        token: resetToken,
        newPassword: data.password,
      });
      console.log(res);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="container">
      <div className="reset-page">
        <div className="reset">
          <Logo />
          <div className="forget-title">
            <label className="reset-title1">Rest Password</label>
            <label className="reset-title2">Enter your new password</label>
          </div>
          <form className="reset-submit" onSubmit={handleSubmit(onSubmit)}>
            {resetPassword.map((pass) => (
              <div className="reset-form" key={pass.validatingName}>
                <InputForm
                  key={pass.validatingName}
                  {...pass}
                  control={control}
                />
              </div>
            ))}
            <Button
              name={"Reset Password"}
              backgroundColor="var(--primary-background)"
              textColor="var(--fourth-color)"
              border="none"
              width="400px"
            />
          </form>
          <div className="link-login">
            <Link to={"/login"} className="link-label">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
