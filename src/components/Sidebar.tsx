import { useNavigate } from "react-router";
import useUser from "../hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import "../css/Sidebar.css";
import type { IconType } from "react-icons";
import { FaThLarge } from "react-icons/fa";
import { IoReceiptOutline, IoWalletOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import { TbLogout } from "react-icons/tb";

interface SidebarProp {
  icon: IconType;
  label: string;
}
const SidebarLink: SidebarProp[] = [
  {
    icon: FaThLarge,
    label: "Overview",
  },
  {
    icon: IoWalletOutline,
    label: "Balances",
  },
  {
    icon: GrTransaction,
    label: "Transactions",
  },
  {
    icon: IoReceiptOutline,
    label: "Bills",
  },
  {
    icon: FaMoneyBill1Wave,
    label: "Expenses",
  },
  {
    icon: GoGoal,
    label: "Goals",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");

  const { user, fetchUser, logout } = useUser();
  const fetchUserCallback = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchUserCallback();
  }, [fetchUserCallback]);

  useEffect(() => {
    const savedActive = localStorage.getItem("activeSidebar") || "overview";
    setActive(savedActive);

    if (location.pathname === "/") {
      navigate(`/${savedActive}`);
    }
  }, [location.pathname, navigate]);

  return (
    <section className="sidebar-layout">
      <section className="logo-menu">
        <section style={{ display: "flex", justifyContent: "center" }}>
          <label className="logo-sidebar">FINEbank.IO</label>
        </section>
        <section className="menu">
          {SidebarLink.map((link) => {
            const Icon = link.icon;
            return (
              <section
                key={link.label}
                className={
                  active === link.label.toLowerCase()
                    ? "active-link"
                    : "sidebar-link"
                }
                onClick={() => {
                  setActive(link.label.toLowerCase());
                  localStorage.setItem(
                    "activeSidebar",
                    link.label.toLocaleLowerCase()
                  );
                  navigate(`/${link.label.toLowerCase()}`);
                }}
              >
                {Icon && (
                  <Icon
                    className={
                      active === link.label.toLowerCase()
                        ? "active-icon"
                        : "notactive-icon"
                    }
                  />
                )}
                <label
                  className={
                    active === link.label.toLowerCase()
                      ? "active-label"
                      : "notactive-label"
                  }
                >
                  {" "}
                  {link.label}
                </label>
              </section>
            );
          })}
        </section>
      </section>
      <section className="footer">
        <button onClick={logout} className="logout-button">
          <TbLogout className="logout-icon" />
          <label className="logout-label">Log out</label>
        </button>
        {user && (
          <section
            onClick={() => {
              setActive("profile");
              localStorage.setItem("activeSidebar", "profile");
              navigate("/profile");
            }}
            className="profile-link"
          >
            <section
              style={{
                display: "flex",
                alignItems: "center",
                height: "40px",
              }}
            >
              <section className="profile-img">
                {user.image && (
                  <img
                    src={user.image}
                    alt="Profile"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "40px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </section>
            </section>
            <section className="profile-label-button">
              <label className="user-name">{user.name}</label>
              <label className="view-profile">View Profile</label>
            </section>
          </section>
        )}
      </section>
    </section>
  );
};

export default Sidebar;
