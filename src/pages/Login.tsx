import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import InputForm, { type UserformProp } from "../components/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstance } from "../util/axios";

const loginForm: Omit<UserformProp, "control">[] = [
  {
    labelName: "Email Address",
    typeform: "text",
    placeholderLabel: "Your email address",
    validatingName: "email",
  },
  {
    labelName: "Password",
    typeform: "password",
    placeholderLabel: "Your password",
    validatingName: "password",
    login: "loginpassword",
  },
];

const schema = yup.object({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Must be minimum 8 characters")
    .matches(/[A-Z]/, "Must have at least one uppercase letter")
    .matches(/[0-9]/, "Must have at least one number")
    .matches(/[^A-Za-z0-9]/, "Must have at least one special character"),
});

const Login = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await axiosInstance.post("/login", data);
      console.log(res.data);
      navigate("/");
    } catch (err: any) {
      console.log("Log in failed:", err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="body-login">
        <div className="login">
          <Logo />
          <form className="login-submit" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form">
              {loginForm.map((login) => (
                <InputForm
                  key={login.validatingName}
                  {...login}
                  control={control}
                />
              ))}
            </div>
            <Button name={"Login"} backgroundColor={""} textColor={""} />
          </form>
        </div>
        <div className="diveder"></div>
      </div>
      <Link to="/register" className="createAcc">
        Create an account
      </Link>
    </div>
  );
};

export default Login;
