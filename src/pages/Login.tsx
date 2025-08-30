import { useContext } from "react";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import InputForm, { type UserformProp } from "../components/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { axiosInstance } from "../util/axios";
import { AuthContext } from "../context/AuthContext";

const loginForm: Omit<UserformProp, "control">[] = [
  {
    labelName: "Email Address",
    typeform: "email",
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

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const { control, handleSubmit, setError } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { setToken } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axiosInstance.post("/login", data);
      const token = res.data.token;

      localStorage.setItem("token", token);
      setToken(token);

      navigate("/", { replace: true });
    } catch (err: any) {
      console.error("Login failed:", err);

      // Handle specific error cases
      if (err.response?.status === 401) {
        setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else if (err.response?.status === 422) {
        setError("email", {
          type: "manual",
          message: "Please check your email format",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "Login failed. Please try again.",
        });
      }
    }
  };

  return (
    <section className="container">
      <section className="login-page">
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
              <Button
                name="Login"
                backgroundColor="var(--primary-background)"
                textColor="var(--fourth-color)"
                border="none"
                width="400px"
              />
            </form>
          </div>
          <section className="create-div">
            <Link to="/register" className="createAcc">
              Create an account
            </Link>
          </section>
        </div>
      </section>
    </section>
  );
};

export default Login;
