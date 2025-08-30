import { useForm } from "react-hook-form";
import type { UserformProp } from "../components/InputForm";
import InputForm from "../components/InputForm";
import Button from "../components/Button";

import { axiosInstance } from "../util/axios";
import useUser from "../hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const securityForm: Omit<UserformProp, "control">[] = [
  {
    labelName: "Password",
    typeform: "password",
    placeholderLabel: "Enter your password",
    validatingName: "password",
  },
];

const Security = () => {
  const { setUser } = useUser();

  const { handleSubmit, control } = useForm();

  const { token } = useContext(AuthContext)!;

  const editPassword = async (data: any) => {
    try {
      const res = await axiosInstance.put("/user", data, {
        headers: {
          token: token,
        },
      });

      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(editPassword)}>
      <label
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: "18px",
          color: "var(--primary-background)",
        }}
      >
        Edit your Password
      </label>
      {securityForm.map((sec) => (
        <InputForm key={sec.validatingName} {...sec} control={control} />
      ))}
      <section
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Button
          name={"Update Password"}
          backgroundColor={"#299D91"}
          textColor={"#FFF"}
          border="none"
          width={"400px"}
        />
      </section>
    </form>
  );
};

export default Security;
