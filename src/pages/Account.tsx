import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import { useCallback, useContext, useEffect, useRef } from "react";
import type { UserformProp } from "../components/InputForm";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import { LuImagePlus } from "react-icons/lu";
import "../css/Account.css";
import { axiosInstance } from "../util/axios";
import { AuthContext } from "../context/AuthContext";

interface DefaultValues {
  name: string;
  email: string;
  username: string;
  phone_number: number;
  image: string;
}

const profileForm: Omit<UserformProp, "control">[] = [
  {
    labelName: "Full Name",
    typeform: "text",
    placeholderLabel: "Enter a new name",
    validatingName: "name",
  },
  {
    labelName: "Email ",
    typeform: "text",
    placeholderLabel: "Enter a new email",
    validatingName: "email",
  },
  {
    labelName: "Username",
    typeform: "text",
    placeholderLabel: "Enter a new username",
    validatingName: "username",
  },
  {
    labelName: "Phone Number",
    typeform: "number",
    placeholderLabel: "Enter a new phone number",
    validatingName: "phone_number",
  },
];

const Account = () => {
  const { user, setUser, fetchUser, loading } = useUser();
  const { token } = useContext(AuthContext)!;
  const isInitialized = useRef(false);

  const { control, register, setValue, handleSubmit } = useForm<DefaultValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
      phone_number: user?.phone_number || 0,
      image: user?.image || "",
    },
  });

  const onSubmit = async (data: any) => {
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

  const fetchUserCallback = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchUserCallback();
  }, [fetchUserCallback]);

  useEffect(() => {
    if (user && !isInitialized.current) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("username", user.username || "");
      setValue("phone_number", user.phone_number || 0);
      setValue("image", user.image || "");
      isInitialized.current = true;
    }
  }, [
    user?.name,
    user?.email,
    user?.username,
    user?.phone_number,
    user?.image,
    setValue,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="account-section">
      {user ? (
        <>
          <section className="profile-section">
            <section className="input-section">
              {profileForm.map((profile) => (
                <InputForm
                  key={profile.validatingName}
                  {...profile}
                  control={control}
                />
              ))}
            </section>

            <Button
              name={"Update Profile"}
              backgroundColor={"#299D91"}
              textColor={"#FFF"}
              border="none"
              width={"192px"}
            />
          </section>
          <section className="image-section">
            <label className="image-label">Your Profile Picture</label>
            {user?.image ? (
              <label htmlFor="file-input">
                <img
                  src={user.image}
                  alt="Profile"
                  style={{
                    width: "142px",
                    height: "131px",
                    objectFit: "cover",
                  }}
                />
              </label>
            ) : (
              <label htmlFor="file-input" className="input-image">
                <LuImagePlus className="image-icon" />
                <label className="image-upload">Upload your photo</label>
              </label>
            )}

            <input
              type="file"
              id="file-input"
              accept="image/*"
              style={{ display: "none" }}
              {...register("image")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setValue("image", reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </section>
        </>
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <p>user not found</p>
      )}
    </form>
  );
};

export default Account;
