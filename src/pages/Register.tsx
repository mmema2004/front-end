import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import InputForm, { type UserformProp } from "../components/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../util/axios";
import Button from "../components/Button";
import "../css/Register.css";

const registerForm: Omit<UserformProp, "control">[] = [
  {
    labelName: "Name",
    typeform: "text",
    placeholderLabel: "Your name",
    validatingName: "name",
  },
  {
    labelName: "Email Address",
    typeform: "text",
    placeholderLabel: "Your email",
    validatingName: "email",
  },
  {
    labelName: "Password",
    typeform: "password",
    placeholderLabel: "Your password",
    validatingName: "password",
  },
];

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Must be minimum 8 characters")
    .matches(/[A-Z]/, "Must have at least one uppercase letter")
    .matches(/[0-9]/, "Must have at least one number")
    .matches(/[^A-Za-z0-9]/, "Must have at least one special character"),
});

const Register = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await axiosInstance.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        username: "",
        phone_number: 0,
        image: "",
      });
      console.log(res.data);
      navigate("/login");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        console.log(err.response.data.error);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <section className="container">
      <section className="register-page">
        <div className="body-register">
          <div className="register">
            <Logo />
            <div style={{ justifyContent: "center", display: "flex" }}>
              <label className="create-acc">Create an Account</label>
            </div>

            <form className="register-submit" onSubmit={handleSubmit(onSubmit)}>
              <div className="register-form">
                {registerForm.map((register) => (
                  <InputForm
                    key={register.validatingName}
                    {...register}
                    control={control}
                  />
                ))}
              </div>

              <Button
                name={"Sign up"}
                backgroundColor="var(--primary-background)"
                textColor="var(--fourth-color)"
                border="none"
                width="400px"
              />
            </form>
          </div>
          <div className="login-acc">
            <label className="have-acc">Already have an account?</label>
            <Link to="/login" className="loginAcc">
              Sign in here
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Register;
