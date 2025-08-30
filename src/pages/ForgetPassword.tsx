import { useForm } from "react-hook-form";
import type { UserformProp } from "../components/InputForm";
import InputForm from "../components/InputForm";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router";
import { axiosInstance } from "../util/axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../css/ForgetPassword.css";

const forgetPassword: Omit<UserformProp, "control">[] = [
  {
    labelName: "Email Address",
    typeform: "text",
    placeholderLabel: "Your email address",
    validatingName: "email",
  },
];

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const onSubmit = async (data: any) => {
  try {
    const res = await axiosInstance.post("/forgot-password", data);
    console.log(res.data);
    alert("Password reset link sent to your email!");
  } catch (err: any) {
    console.error(err);
    alert("Failed to send reset link");
  }
};

const ForgetPassword = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <section className="container">
      <div className="forget-page">
        <div className="body-forget">
          <div className="forget">
            <Logo />
            <div className="forget-title">
              <label className="forget-title1">Forgot password?</label>

              <label className="forget-title2">
                Enter your email address to get the password reset link
              </label>
            </div>
            <form className="forget-submit" onSubmit={handleSubmit(onSubmit)}>
              <div className="forget-form">
                {forgetPassword.map((input) => (
                  <InputForm
                    key={input.validatingName}
                    {...input}
                    control={control}
                  />
                ))}
              </div>
              <Button
                name={"Password Reset"}
                backgroundColor="var(--primary-background)"
                textColor="var(--fourth-color)"
                border="none"
                width="400px"
              />
            </form>
          </div>
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

export default ForgetPassword;
