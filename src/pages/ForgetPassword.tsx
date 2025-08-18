import { useForm } from "react-hook-form";
import type { UserformProp } from "../components/InputForm";
import InputForm from "../components/InputForm";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { Link } from "react-router";
import { axiosInstance } from "../util/axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    <div>
      <Logo />
      <div>
        <div>
          <p>Forgot password?</p>
          <p>Enter your email address to get the password reset link</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {forgetPassword.map((input) => (
              <InputForm
                key={input.validatingName}
                {...input}
                control={control}
              />
            ))}
            <Button
              name={"Password Reset"}
              backgroundColor={""}
              textColor={""}
            />
          </div>
          <Link to={"/login"}>Back to login</Link>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
