import type { UserformProp } from "../components/InputForm";
import * as yup from "yup";
import InputForm from "../components/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../util/axios";

const resetPassword: Omit<UserformProp, "control">[] = [
  {
    labelName: "Passowrd",
    typeform: "text",
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
    <div>
      <p>Rest Password</p>
      <p>Enter your new password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {resetPassword.map((pass) => (
          <InputForm key={pass.validatingName} {...pass} control={control} />
        ))}
        <Button name={"Reset Password"} backgroundColor={""} textColor={""} />
      </form>
    </div>
  );
};

export default ResetPassword;
