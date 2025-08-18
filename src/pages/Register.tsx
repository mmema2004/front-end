import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import InputForm, { type UserformProp } from "../components/InputForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../util/axios";
import Button from "../components/Button";

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
    placeholderLabel: "Your email address",
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
      const res = await axiosInstance.post("/users", data);
      console.log(res.data);
      navigate("/login");
    } catch (err: any) {
      if (err.response?.status === 400) {
        console.log(
          err.response.data.message || "You have registered with this email"
        );
      } else {
        console.log("Registration failed:", err.message);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register">
        <Logo />
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
          {/* <button type="submit" className="button" sty>
            Register
          </button> */}
          <Button name={"sign up"} backgroundColor={""} textColor={""} />
        </form>
      </div>
      <div>
        <p>Already have an account?</p>
        <Link to="/login" className="createAcc">
          Sign in here
        </Link>
      </div>
    </div>
  );
};

export default Register;
