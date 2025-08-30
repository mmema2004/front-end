import { useState } from "react";
import "../css/Profile.css";
import Account from "./Account";
import Security from "./Security";

interface ButtonProp {
  label: string;
}

const Button: ButtonProp[] = [
  {
    label: "Account",
  },
  {
    label: "Security",
  },
];

const Profile = () => {
  const [active, setActive] = useState("Account");

  return (
    <section className="profile-tab">
      <section className="profile-header">
        {Button.map((btn) => (
          <section
            className={
              active === btn.label ? "profile-btn-active" : "profile-btn"
            }
            key={btn.label}
            onClick={() => setActive(btn.label)}
          >
            <label
              className={
                active === btn.label ? "profile-label-active" : "profile-label"
              }
            >
              {" "}
              {btn.label}
            </label>
          </section>
        ))}
      </section>

      {active === "Account" ? <Account /> : <Security />}
    </section>
  );
};

export default Profile;
